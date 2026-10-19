import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { portfolioKnowledge } from "@/lib/chatbot-knowledge";
import { readBoundedJson } from "@/lib/read-bounded-json";

const requests = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 12;
const MAX_RATE_LIMIT_BUCKETS = 2_048;
const MAX_IN_FLIGHT = 32;
const inFlight = new Map<string, Promise<string>>();

function json(body: object, status = 200, retryAfter?: number) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": String(retryAfter) } : {}) } });
}

function normalizeAnswer(value: string) {
  return value
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

function isRateLimited(ip: string, now: number) {
  const current = requests.get(ip);
  if (current && current.resetAt > now) {
    if (current.count >= MAX_REQUESTS_PER_WINDOW) return true;
    current.count += 1;
    return false;
  }

  requests.delete(ip);
  if (requests.size >= MAX_RATE_LIMIT_BUCKETS) {
    for (const [key, bucket] of requests) {
      if (bucket.resetAt <= now) requests.delete(key);
    }
  }
  if (requests.size >= MAX_RATE_LIMIT_BUCKETS) {
    const oldestKey = requests.keys().next().value;
    if (oldestKey) requests.delete(oldestKey);
  }
  requests.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  return false;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelolacsao-portfolio.vercel.app";
  const requestOrigin = new URL(request.url).origin;
  const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const requestProtocol = request.headers.get("x-forwarded-proto") ?? new URL(request.url).protocol.replace(":", "");
  const forwardedOrigin = requestHost ? `${requestProtocol}://${requestHost}` : requestOrigin;
  if (origin && origin !== siteOrigin && origin !== requestOrigin && origin !== forwardedOrigin) return json({ error: "Request origin is not allowed." }, 403);
  if (Number(request.headers.get("content-length") ?? 0) > 4_096) return json({ error: "Request is too large." }, 413);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip, Date.now())) return json({ error: "Please wait a moment before sending another message." }, 429, 60);

  const parsed = await readBoundedJson(request, 4_096);
  if (!parsed.ok) return json({ error: parsed.reason === "too-large" ? "Request is too large." : "Invalid request." }, parsed.reason === "too-large" ? 413 : 400);
  const body = parsed.value;
  const message = body && typeof body === "object" && "message" in body ? body.message : undefined;
  if (typeof message !== "string" || message.trim().length < 2 || message.length > 500) {
    return json({ error: "Please enter a shorter question." }, 400);
  }

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return json({ answer: "The assistant is temporarily unavailable. You can still explore the portfolio or contact me directly." });

  const normalizedMessage = message.trim();
  const requestKey = createHash("sha256").update(ip).update("\0").update(normalizedMessage).digest("hex");
  const pending = inFlight.get(requestKey);
  if (pending) return json({ answer: await pending });
  if (inFlight.size >= MAX_IN_FLIGHT) return json({ error: "The assistant is busy. Please try again shortly." }, 503, 2);

  const work = askProvider(key, normalizedMessage);
  inFlight.set(requestKey, work);
  try {
    return json({ answer: await work });
  } finally {
    inFlight.delete(requestKey);
  }
}

async function askProvider(key: string, message: string): Promise<string> {
  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "deepseek-chat",
      temperature: 0.2,
      max_tokens: 260,
      messages: [
        { role: "system", content: portfolioKnowledge },
        { role: "user", content: message },
      ],
    }),
    signal: AbortSignal.timeout(12_000),
    cache: "no-store",
  }).catch(() => null);

  if (!response?.ok) {
    console.warn("[portfolio/chat] provider request failed", { status: response?.status ?? "network-or-timeout" });
    return "I can’t reach the assistant right now, but you can review my resume, selected work, or contact me directly.";
  }
  const data = await response.json().catch(() => null);
  const answer = data?.choices?.[0]?.message?.content;
  return typeof answer === "string" && answer.trim() ? normalizeAnswer(answer).slice(0, 1_200) : "I don’t have a verified answer for that yet. Please use the portfolio sections or contact me directly.";
}
