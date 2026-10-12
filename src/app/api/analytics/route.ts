import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

type AnalyticsEvent = {
  event: "page_view" | "click";
  path: string;
  target?: string;
  visitorId?: string;
};

const buckets = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = 30;
const MAX_RATE_LIMIT_BUCKETS = 2_048;

function isValidEvent(value: unknown): value is AnalyticsEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Partial<AnalyticsEvent>;
  return (event.event === "page_view" || event.event === "click")
    && typeof event.path === "string" && event.path.startsWith("/") && event.path.length <= 160
    && (event.target === undefined || (typeof event.target === "string" && event.target.length <= 120))
    && (event.visitorId === undefined || (typeof event.visitorId === "string" && /^[a-zA-Z0-9_-]{16,80}$/.test(event.visitorId)));
}

function hash(value: string, salt: string) {
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

function json(body: object, status: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelolacsao-portfolio.vercel.app";
  const requestOrigin = new URL(request.url).origin;
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const requestProtocol = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "");
  const forwardedOrigin = requestHost ? `${requestProtocol}://${requestHost}` : requestOrigin;
  if (origin && origin !== allowedOrigin && origin !== requestOrigin && origin !== forwardedOrigin) return json({ accepted: false }, 403);
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return json({ accepted: false }, 413);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else if (bucket.count >= MAX_EVENTS_PER_WINDOW) return json({ accepted: false }, 429);
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

  let event: unknown;
  try { event = await request.json(); } catch { return json({ accepted: false }, 400); }
  if (!isValidEvent(event)) return json({ accepted: false }, 400);

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hashSalt = process.env.ANALYTICS_HASH_SALT;
  if (!url || !serviceRoleKey || !hashSalt) return json({ accepted: true, persisted: false }, 202);

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
    });
  } catch {
    return json({ accepted: false, persisted: false }, 503);
  }
  if (!response.ok) return json({ accepted: false, persisted: false }, 503);
  return json({ accepted: true, persisted: true }, 202);
}
