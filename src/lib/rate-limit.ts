import { isOn } from "@/config/features";

/**
 * Per-key rate limiter (SEC-02).
 *  - Upstash Redis via REST when UPSTASH_REDIS_REST_URL + TOKEN are set
 *    (shared across serverless instances).
 *  - In-memory fallback otherwise (per instance — fine for small sites,
 *    resets on cold start).
 * When SEC-02 is off, every request is allowed.
 */
const memory = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitResult {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
}

export async function rateLimit(
  key: string,
  { limit = 5, windowSec = 600 }: { limit?: number; windowSec?: number } = {}
): Promise<RateLimitResult> {
  if (!isOn("SEC-02")) return { ok: true, remaining: limit, retryAfterSec: 0 };

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      return await upstash(url, token, key, limit, windowSec);
    } catch (err) {
      console.error("[rate-limit] Upstash failed, falling back to memory", err);
    }
  }
  return memoryLimit(key, limit, windowSec);
}

function memoryLimit(key: string, limit: number, windowSec: number): RateLimitResult {
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.resetAt <= now) {
    memory.set(key, { count: 1, resetAt: now + windowSec * 1000 });
    if (memory.size > 5000) for (const [k, v] of memory) if (v.resetAt <= now) memory.delete(k);
    return { ok: true, remaining: limit - 1, retryAfterSec: 0 };
  }
  entry.count++;
  const ok = entry.count <= limit;
  return { ok, remaining: Math.max(0, limit - entry.count), retryAfterSec: ok ? 0 : Math.ceil((entry.resetAt - now) / 1000) };
}

async function upstash(url: string, token: string, key: string, limit: number, windowSec: number): Promise<RateLimitResult> {
  const k = `rl:${key}`;
  const res = await fetch(`${url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify([["INCR", k], ["EXPIRE", k, String(windowSec), "NX"], ["TTL", k]]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash HTTP ${res.status}`);
  const data = (await res.json()) as { result: number }[];
  const count = Number(data[0]?.result ?? 0);
  const ttl = Number(data[2]?.result ?? windowSec);
  const ok = count <= limit;
  return { ok, remaining: Math.max(0, limit - count), retryAfterSec: ok ? 0 : Math.max(1, ttl) };
}

/** Best-effort client IP behind Vercel / proxies. */
export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}
