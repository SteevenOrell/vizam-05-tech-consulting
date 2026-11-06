import { createHash, randomBytes } from "node:crypto";

/**
 * Basic in-memory sliding-window rate limiter.
 *
 * - Keys are salted SHA-256 hashes of the client address; raw addresses are never stored or logged.
 * - State lives only in this server instance's memory and disappears on restart.
 * - Limitation: on serverless platforms each instance has its own memory, so this is a best-effort
 *   limit. Production use needs a shared store (documented in docs/report.md).
 */
const SALT = randomBytes(16).toString("hex");

export type RateLimiter = {
  check: (rawKey: string, now?: number) => { allowed: boolean; remaining: number; retryAfterMs: number };
  reset: () => void;
  size: () => number;
};

export function hashKey(rawKey: string) {
  return createHash("sha256").update(SALT).update(rawKey).digest("hex").slice(0, 32);
}

export function createRateLimiter({ limit, windowMs, maxKeys = 5000 }: { limit: number; windowMs: number; maxKeys?: number }): RateLimiter {
  const hits = new Map<string, number[]>();

  function prune(now: number) {
    for (const [k, times] of hits) {
      const recent = times.filter((t) => now - t < windowMs);
      if (recent.length) hits.set(k, recent);
      else hits.delete(k);
    }
  }

  return {
    check(rawKey, now = Date.now()) {
      const key = hashKey(rawKey);
      if (hits.size > maxKeys) prune(now);
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return { allowed: false, remaining: 0, retryAfterMs: windowMs - (now - recent[0]) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { allowed: true, remaining: limit - recent.length, retryAfterMs: 0 };
    },
    reset() {
      hits.clear();
    },
    size() {
      return hits.size;
    },
  };
}

/** Shared limiter for both public forms: 5 submissions per 10 minutes per client. */
export const formLimiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
