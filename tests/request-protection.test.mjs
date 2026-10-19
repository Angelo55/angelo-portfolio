import assert from "node:assert/strict";
import { after, test } from "node:test";
import { boundedInteger, clientAddress } from "../src/lib/request-protection.ts";
import { createChatRateLimiter } from "../src/lib/chat-rate-limit.ts";

test("bounded settings fall back for malformed and out-of-range values", () => {
  assert.equal(boundedInteger(undefined, 12, 1, 120), 12);
  assert.equal(boundedInteger("0", 12, 1, 120), 12);
  assert.equal(boundedInteger("121", 12, 1, 120), 12);
  assert.equal(boundedInteger("12.5", 12, 1, 120), 12);
  assert.equal(boundedInteger("42", 12, 1, 120), 42);
});

const previousVercel = process.env.VERCEL;
after(() => {
  if (previousVercel === undefined) delete process.env.VERCEL;
  else process.env.VERCEL = previousVercel;
});

test("client address rejects malformed values and prefers Vercel's forwarded header", () => {
  delete process.env.VERCEL;
  assert.equal(clientAddress(new Request("http://localhost", { headers: { "x-forwarded-for": "203.0.113.7, 198.51.100.2" } })), "203.0.113.7");
  assert.equal(clientAddress(new Request("http://localhost", { headers: { "x-forwarded-for": "not-an-ip" } })), "unknown");
  process.env.VERCEL = "1";
  assert.equal(clientAddress(new Request("https://example.com", { headers: { "x-forwarded-for": "198.51.100.2", "x-vercel-forwarded-for": "203.0.113.7" } })), "203.0.113.7");
});

test("chat limiter enforces cooldown, minute and daily quotas, and resets", () => {
  const admit = createChatRateLimiter({ perMinute: 2, perDay: 3, cooldownMs: 1_000 });
  assert.deepEqual(admit("203.0.113.7", 0), { allowed: true });
  assert.deepEqual(admit("203.0.113.7", 500), { allowed: false, reason: "cooldown", retryAfter: 1 });
  assert.deepEqual(admit("203.0.113.7", 1_000), { allowed: true });
  assert.deepEqual(admit("203.0.113.7", 2_000), { allowed: false, reason: "minute_limit", retryAfter: 58 });
  assert.deepEqual(admit("203.0.113.7", 60_000), { allowed: true });
  assert.equal(admit("203.0.113.7", 61_000).allowed, false);
  assert.deepEqual(admit("203.0.113.7", 86_400_000), { allowed: true });
});

test("coalesced questions still consume request quota", () => {
  const admit = createChatRateLimiter({ perMinute: 2, perDay: 3, cooldownMs: 1_000 });
  assert.deepEqual(admit("203.0.113.8", 0), { allowed: true });
  assert.deepEqual(admit("203.0.113.8", 0, true), { allowed: true });
  assert.deepEqual(admit("203.0.113.8", 0, true), { allowed: false, reason: "minute_limit", retryAfter: 60 });
});
