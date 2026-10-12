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

function isValidEvent(value: unknown): value is AnalyticsEvent {
  if (!value || typeof value !== "object") return false;
  const event = value as Partial<AnalyticsEvent>;
  return (event.event === "page_view" || event.event === "click")
    && typeof event.path === "string" && event.path.startsWith("/") && event.path.length <= 160
    && (event.target === undefined || (typeof event.target === "string" && event.target.length <= 120))
    && (event.visitorId === undefined || (typeof event.visitorId === "string" && /^[a-zA-Z0-9_-]{16,80}$/.test(event.visitorId)));
}

function hash(value: string) {
  return createHash("sha256").update(`${process.env.ANALYTICS_HASH_SALT ?? "development-only-salt"}:${value}`).digest("hex");
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelolacsao-portfolio.vercel.app";
  if (origin && origin !== allowedOrigin) return NextResponse.json({ accepted: false }, { status: 403 });
  if (Number(request.headers.get("content-length") ?? 0) > 4096) return NextResponse.json({ accepted: false }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt <= now) buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else if (bucket.count >= MAX_EVENTS_PER_WINDOW) return NextResponse.json({ accepted: false }, { status: 429 });
  else bucket.count += 1;

  let event: unknown;
  try { event = await request.json(); } catch { return NextResponse.json({ accepted: false }, { status: 400 }); }
  if (!isValidEvent(event)) return NextResponse.json({ accepted: false }, { status: 400 });

  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return NextResponse.json({ accepted: true, persisted: false }, { status: 202 });

  const response = await fetch(`${url}/rest/v1/portfolio_analytics_events`, {
    method: "POST",
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      event_type: event.event,
      path: event.path,
      target: event.target ?? null,
      visitor_hash: event.visitorId ? hash(event.visitorId) : null,
      ip_hash: hash(ip),
    }),
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ accepted: false }, { status: 503 });
  return NextResponse.json({ accepted: true, persisted: true }, { status: 202 });
}
