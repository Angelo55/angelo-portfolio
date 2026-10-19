type RequestBucket = { count: number; resetAt: number; dailyCount: number; dayResetAt: number; lastAcceptedAt: number };
type Admission = { allowed: true } | { allowed: false; reason: "daily_quota" | "minute_limit" | "cooldown"; retryAfter: number };

export function createChatRateLimiter(options: { perMinute: number; perDay: number; cooldownMs: number; maxBuckets?: number }) {
  const requests = new Map<string, RequestBucket>();
  const maxBuckets = options.maxBuckets ?? 2_048;
  return (ip: string, now: number, skipCooldown = false): Admission => {
    let current = requests.get(ip);
    if (current && current.dayResetAt <= now) {
      requests.delete(ip);
      current = undefined;
    }
    if (requests.size >= maxBuckets) {
      for (const [key, bucket] of requests) {
        if (bucket.dayResetAt <= now) requests.delete(key);
      }
    }
    if (!current && requests.size >= maxBuckets) {
      const oldestKey = requests.keys().next().value;
      if (oldestKey) requests.delete(oldestKey);
    }
    if (!current) {
      requests.set(ip, { count: 1, resetAt: now + 60_000, dailyCount: 1, dayResetAt: now + 86_400_000, lastAcceptedAt: now });
      return { allowed: true };
    }
    if (current.resetAt <= now) { current.count = 0; current.resetAt = now + 60_000; }
    if (current.dailyCount >= options.perDay) return { allowed: false, reason: "daily_quota", retryAfter: Math.max(1, Math.ceil((current.dayResetAt - now) / 1000)) };
    if (current.count >= options.perMinute) return { allowed: false, reason: "minute_limit", retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
    if (!skipCooldown && now - current.lastAcceptedAt < options.cooldownMs) return { allowed: false, reason: "cooldown", retryAfter: Math.max(1, Math.ceil((options.cooldownMs - (now - current.lastAcceptedAt)) / 1000)) };
    current.count += 1;
    current.dailyCount += 1;
    current.lastAcceptedAt = now;
    return { allowed: true };
  };
}
