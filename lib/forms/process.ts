import { randomBytes } from "node:crypto";
import type { z } from "zod";
import { firstErrors } from "./schemas";
import type { RateLimiter } from "./rate-limit";

export type FormResult =
  | { status: "success"; reference: string; demo: true }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

/** Submissions completed faster than this are treated as automated. */
export const MIN_FILL_MS = 2000;

type Meta = { company_website?: unknown; startedAt?: unknown };

function demoReference() {
  return `DEMO-${randomBytes(3).toString("hex").toUpperCase()}`;
}

/**
 * Shared server-side handling for every public form:
 * honeypot → timing check → rate limit → Zod validation → demo receipt.
 *
 * Nothing is stored, sent or logged. Spam is answered with an indistinguishable demo receipt so bots
 * learn nothing from the response.
 */
export function processSubmission<S extends z.ZodType>(
  schema: S,
  input: unknown,
  { clientKey, limiter, now = Date.now() }: { clientKey: string; limiter: RateLimiter; now?: number },
): FormResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { status: "error", message: "The form could not be read. Please try again." };
  }
  const { company_website, startedAt, ...fields } = input as Meta & Record<string, unknown>;

  // Honeypot: real visitors never see or fill this field.
  if (typeof company_website === "string" && company_website.trim() !== "") {
    return { status: "success", reference: demoReference(), demo: true };
  }

  // Timing: a human cannot complete the form in under two seconds.
  const started = typeof startedAt === "number" ? startedAt : Number(startedAt);
  if (!Number.isFinite(started) || now - started < MIN_FILL_MS) {
    return { status: "success", reference: demoReference(), demo: true };
  }

  const rate = limiter.check(clientKey, now);
  if (!rate.allowed) {
    const minutes = Math.max(1, Math.ceil(rate.retryAfterMs / 60000));
    return {
      status: "error",
      message: `Too many submissions from this connection. Please try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  const parsed = schema.safeParse(fields);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Some answers need attention. Please check the highlighted fields.",
      fieldErrors: firstErrors(parsed.error),
    };
  }

  // Demo only: no email provider is configured and personal data is deliberately discarded here.
  return { status: "success", reference: demoReference(), demo: true };
}
