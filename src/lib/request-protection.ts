import { isIP } from "node:net";

export function boundedInteger(value: string | undefined, fallback: number, minimum: number, maximum: number) {
  if (!value || !/^\d+$/.test(value)) return fallback;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) && parsed >= minimum && parsed <= maximum ? parsed : fallback;
}

export function clientAddress(request: Request) {
  // Vercel supplies this header itself; local development uses the forwarded header.
  const forwarded = process.env.VERCEL === "1"
    ? request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for")
    : request.headers.get("x-forwarded-for");
  const address = forwarded?.split(",", 1)[0]?.trim();
  return address && isIP(address) ? address : "unknown";
}

const rejectionCounts = new Map<string, number>();

export function recordRequestRejection(route: "chat" | "analytics", reason: string) {
  const key = `${route}:${reason}`;
  const count = (rejectionCounts.get(key) ?? 0) + 1;
  rejectionCounts.set(key, count);
  if (count === 1 || count % 100 === 0) {
    console.warn(`[portfolio/${route}] request rejected`, { reason, count });
  }
}
