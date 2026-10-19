import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { readBoundedJson } from "@/lib/read-bounded-json";
import { boundedInteger, clientAddress, recordRequestRejection } from "@/lib/request-protection";

type AnalyticsEvent = {
  event: "page_view" | "click";
  path: string;
  target?: string;
  visitorId?: string;
  eventId?: string;
};

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = boundedInteger(process.env.ANALYTICS_RATE_LIMIT_PER_MINUTE, 30, 1, 300);
const MAX_RATE_LIMIT_BUCKETS = 2_048;
const EVENT_CACHE_MS = 10 * 60_000;
const MAX_EVENT_CACHE = 2_048;
const MAX_ACTIVE_STORES = boundedInteger(process.env.ANALYTICS_MAX_ACTIVE_STORES, 64, 1, 128);
let activeStores = 0;
type StoreResult = { accepted: boolean; persisted?: boolean; status: number };
const pendingEvents = new Map<string, { fingerprint: string; work: Promise<StoreResult> }>();
const completedEvents = new Map<string, { fingerprint: string; result: StoreResult; expiresAt: number }>();

function isValidEvent(value: unknown): value is AnalyticsEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Partial<AnalyticsEvent>;
  return (event.event === "page_view" || event.event === "click")
    && typeof event.path === "string" && event.path.startsWith("/") && event.path.length <= 160
    && (event.target === undefined || (typeof event.target === "string" && event.target.length <= 120))
    && (event.visitorId === undefined || (typeof event.visitorId === "string" && /^[a-zA-Z0-9_-]{16,80}$/.test(event.visitorId)))
    && (event.eventId === undefined || (typeof event.eventId === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(event.eventId)));
}

function hash(value: string, salt: string) {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

function json(body: object, status: number, retryAfter?: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelolacsao-portfolio.vercel.app";
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== allowedOrigin && origin !== requestOrigin) return json({ accepted: false }, 403);
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return json({ accepted: false }, 413);
  const ip = clientAddress(request);
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else if (bucket.count >= MAX_EVENTS_PER_WINDOW) {
    recordRequestRejection("analytics", "minute_limit");
    return json({ accepted: false }, 429, Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)));
  }
  else bucket.count += 1;

  if (buckets.size >= MAX_RATE_LIMIT_BUCKETS) {
    for (const [key, value] of buckets) {
      if (value.resetAt <= now) buckets.delete(key);
    }
    if (buckets.size >= MAX_RATE_LIMIT_BUCKETS) {
      const oldestKey = buckets.keys().next().value;
      if (oldestKey && oldestKey !== ip) buckets.delete(oldestKey);
    }
  }

  const parsed = await readBoundedJson(request, 4_096);
  if (!parsed.ok) return json({ accepted: false }, parsed.reason === "too-large" ? 413 : 400);
  const event = parsed.value;
  if (!isValidEvent(event)) return json({ accepted: false }, 400);

  const eventId = event.eventId?.toLowerCase();
  const fingerprint = eventId ? hash(JSON.stringify([ip, event.event, event.path, event.target ?? null, event.visitorId ?? null]), "event") : "";
  if (eventId) {
    const finished = completedEvents.get(eventId);
    if (finished && finished.expiresAt > now) {
      if (finished.fingerprint !== fingerprint) return json({ accepted: false }, 409);
      return json({ accepted: finished.result.accepted, persisted: finished.result.persisted }, finished.result.status);
    }
    const pending = pendingEvents.get(eventId);
    if (pending) {
      if (pending.fingerprint !== fingerprint) return json({ accepted: false }, 409);
      const result = await pending.work;
      return json({ accepted: result.accepted, persisted: result.persisted }, result.status);
    }
  }

  if (activeStores >= MAX_ACTIVE_STORES) {
    recordRequestRejection("analytics", "busy");
    return json({ accepted: false }, 503, 2);
  }
  activeStores += 1;
  const work = storeEvent(event, ip);
  if (eventId) pendingEvents.set(eventId, { fingerprint, work });
  try {
    const result = await work;
    if (eventId && result.accepted) {
      for (const [id, cached] of completedEvents) if (cached.expiresAt <= now) completedEvents.delete(id);
      if (completedEvents.size >= MAX_EVENT_CACHE) completedEvents.delete(completedEvents.keys().next().value!);
      completedEvents.set(eventId, { fingerprint, result, expiresAt: Date.now() + EVENT_CACHE_MS });
    }
    return json({ accepted: result.accepted, persisted: result.persisted }, result.status);
  } finally {
    if (eventId) pendingEvents.delete(eventId);
    activeStores -= 1;
  }
}

async function storeEvent(event: AnalyticsEvent, ip: string): Promise<StoreResult> {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hashSalt = process.env.ANALYTICS_HASH_SALT;
  if (!url || !serviceRoleKey || !hashSalt) return { accepted: true, persisted: false, status: 202 };

  let response: Response;
  try {
    response = await fetch(`${url}/rest/v1/portfolio_analytics_events`, {
      method: "POST",
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
      body: JSON.stringify({
        event_type: event.event,
        path: event.path,
        target: event.target ?? null,
        visitor_hash: event.visitorId ? hash(event.visitorId, hashSalt) : null,
        ip_hash: hash(ip, hashSalt),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(5_000),
    });
  } catch {
    console.warn("[portfolio/analytics] storage request failed", { reason: "network-or-timeout" });
    return { accepted: false, persisted: false, status: 503 };
  }
  if (!response.ok) {
    console.warn("[portfolio/analytics] storage request failed", { status: response.status });
    return { accepted: false, persisted: false, status: 503 };
  }
  return { accepted: true, persisted: true, status: 202 };
}
