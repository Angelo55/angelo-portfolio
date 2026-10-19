import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { portfolioKnowledge } from "@/lib/chatbot-knowledge";
import { createChatRateLimiter } from "@/lib/chat-rate-limit";
import { readBoundedJson } from "@/lib/read-bounded-json";
import { boundedInteger, clientAddress, recordRequestRejection } from "@/lib/request-protection";

const MAX_REQUESTS_PER_WINDOW = boundedInteger(process.env.CHAT_RATE_LIMIT_PER_MINUTE, 12, 1, 120);
const MAX_REQUESTS_PER_DAY = boundedInteger(process.env.CHAT_DAILY_LIMIT_PER_IP, 80, 1, 500);
const COOLDOWN_MS = boundedInteger(process.env.CHAT_COOLDOWN_MS, 1_000, 0, 10_000);
const MAX_IN_FLIGHT = boundedInteger(process.env.CHAT_MAX_IN_FLIGHT, 32, 1, 128);
const inFlight = new Map<string, Promise<string>>();
const admission = createChatRateLimiter({ perMinute: MAX_REQUESTS_PER_WINDOW, perDay: MAX_REQUESTS_PER_DAY, cooldownMs: COOLDOWN_MS });

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

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://angelolacsao-portfolio.vercel.app";
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== siteOrigin && origin !== requestOrigin) return json({ error: "Request origin is not allowed." }, 403);
  if (Number(request.headers.get("content-length") ?? 0) > 4_096) return json({ error: "Request is too large." }, 413);

  const ip = clientAddress(request);

  const parsed = await readBoundedJson(request, 4_096);
  if (!parsed.ok) return json({ error: parsed.reason === "too-large" ? "Request is too large." : "Invalid request." }, parsed.reason === "too-large" ? 413 : 400);
  const body = parsed.value;
  const message = body && typeof body === "object" && "message" in body ? body.message : undefined;
  if (typeof message !== "string" || message.trim().length < 2 || message.length > 500) {
    return json({ error: "Please enter a shorter question." }, 400);
  }

  const normalizedMessage = message.trim();
  const requestKey = createHash("sha256").update(ip).update("\0").update(normalizedMessage).digest("hex");
  const pending = inFlight.get(requestKey);
  const limit = admission(ip, Date.now(), Boolean(pending));
  if (!limit.allowed) {
    recordRequestRejection("chat", limit.reason);
    const duration = limit.retryAfter >= 3_600 ? Math.ceil(limit.retryAfter / 3_600)
      : limit.retryAfter >= 60 ? Math.ceil(limit.retryAfter / 60) : limit.retryAfter;
    const unit = limit.retryAfter >= 3_600 ? "hour" : limit.retryAfter >= 60 ? "minute" : "second";
    const wait = `${duration} ${unit}${duration === 1 ? "" : "s"}`;
    return json({ error: `Chat is temporarily limited. Please try again in about ${wait}.` }, 429, limit.retryAfter);
  }
  if (pending) return json({ answer: await pending });
  if (inFlight.size >= MAX_IN_FLIGHT) {
    recordRequestRejection("chat", "busy");
    return json({ error: "The assistant is busy. Please try again shortly." }, 503, 2);
  }

  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return json({ answer: "The assistant is temporarily unavailable. You can still explore the portfolio or contact me directly." });

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
