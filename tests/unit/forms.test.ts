import { describe, expect, it, beforeEach } from "vitest";
import { MIN_FILL_MS, processSubmission } from "@/lib/forms/process";
import { createRateLimiter, hashKey } from "@/lib/forms/rate-limit";
import { consultationSchema, contactSchema, industryOptions } from "@/lib/forms/schemas";
import { industries } from "@/lib/content/industries";

const NOW = 1_800_000_000_000;
const validContact = {
  name: "Jane Doe",
  email: "jane@example.com",
  organisation: "Example Org",
  topic: "General enquiry",
  message: "Hello, I would like to know more about your approach.",
  consent: true,
};
const validConsultation = {
  name: "John Doe",
  email: "john@example.com",
  organisation: "Example Ltd",
  role: "CTO",
  industry: "public-sector",
  size: "250–1,000",
  areas: ["data-ai", "cyber-resilience"],
  timeframe: "Within 3 months",
  challenge: "We need to decide whether to replace our case management system or extend it.",
  consent: true,
};

describe("schemas", () => {
  it("accepts valid contact input", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });
  it("rejects bad email, short message, missing consent", () => {
    const r = contactSchema.safeParse({ ...validContact, email: "nope", message: "short", consent: false });
    expect(r.success).toBe(false);
    if (!r.success) {
      const paths = r.error.issues.map((i) => i.path[0]);
      expect(paths).toEqual(expect.arrayContaining(["email", "message", "consent"]));
    }
  });
  it("rejects unknown topics and overly long fields", () => {
    expect(contactSchema.safeParse({ ...validContact, topic: "Hack" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, message: "x".repeat(2001) }).success).toBe(false);
  });
  it("accepts valid consultation input and requires at least one area", () => {
    expect(consultationSchema.safeParse(validConsultation).success).toBe(true);
    expect(consultationSchema.safeParse({ ...validConsultation, areas: [] }).success).toBe(false);
    expect(consultationSchema.safeParse({ ...validConsultation, areas: ["unknown"] }).success).toBe(false);
  });
  it("only accepts known industries, matching the content model", () => {
    expect([...industryOptions].sort()).toEqual([...industries.map((i) => i.slug), "other"].sort());
    expect(consultationSchema.safeParse({ ...validConsultation, industry: "x".repeat(5000) }).success).toBe(false);
  });
  it("trims whitespace", () => {
    const r = contactSchema.safeParse({ ...validContact, name: "  Jane Doe  " });
    expect(r.success && r.data.name).toBe("Jane Doe");
  });
});

describe("rate limiter", () => {
  it("allows up to the limit then blocks within the window", () => {
    const rl = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(rl.check("a", 0).allowed).toBe(true);
    expect(rl.check("a", 10).allowed).toBe(true);
    const third = rl.check("a", 20);
    expect(third.allowed).toBe(false);
    expect(third.retryAfterMs).toBe(980);
    expect(rl.check("b", 20).allowed).toBe(true);
    expect(rl.check("a", 1500).allowed).toBe(true);
  });
  it("stores hashed keys, never the raw value", () => {
    expect(hashKey("203.0.113.5")).not.toContain("203.0.113.5");
    expect(hashKey("203.0.113.5")).toHaveLength(32);
  });
  it("prunes expired keys when the map grows", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 100, maxKeys: 3 });
    for (let i = 0; i < 5; i++) rl.check(`k${i}`, 0);
    rl.check("late", 1000);
    expect(rl.size()).toBe(1);
  });
  it("keeps memory bounded when many distinct keys are active", () => {
    const rl = createRateLimiter({ limit: 1, windowMs: 60_000, maxKeys: 3 });
    for (let i = 0; i < 50; i++) rl.check(`k${i}`, i);
    expect(rl.size()).toBeLessThanOrEqual(4);
  });
});

describe("processSubmission", () => {
  let limiter = createRateLimiter({ limit: 3, windowMs: 60_000 });
  beforeEach(() => {
    limiter = createRateLimiter({ limit: 3, windowMs: 60_000 });
  });
  const meta = { company_website: "", startedAt: NOW - MIN_FILL_MS - 1000 };

  it("returns a demo receipt for valid input", () => {
    const r = processSubmission(contactSchema, { ...validContact, ...meta }, { clientKey: "ip", limiter, now: NOW });
    expect(r.status).toBe("success");
    if (r.status === "success") {
      expect(r.demo).toBe(true);
      expect(r.reference).toMatch(/^DEMO-[0-9A-F]{6}$/);
    }
  });

  it("returns field errors for invalid input", () => {
    const r = processSubmission(contactSchema, { ...validContact, email: "x", ...meta }, { clientKey: "ip", limiter, now: NOW });
    expect(r.status).toBe("error");
    if (r.status === "error") expect(r.fieldErrors?.email).toBeTruthy();
  });

  it("silently accepts (and discards) honeypot hits without counting them", () => {
    const r = processSubmission(contactSchema, { ...validContact, ...meta, company_website: "http://spam" }, { clientKey: "ip", limiter, now: NOW });
    expect(r.status).toBe("success");
    expect(limiter.size()).toBe(0);
  });

  it("treats submissions faster than the minimum fill time as spam", () => {
    const r = processSubmission(contactSchema, { ...validContact, company_website: "", startedAt: NOW - 100 }, { clientKey: "ip", limiter, now: NOW });
    expect(r.status).toBe("success");
    expect(limiter.size()).toBe(0);
  });

  it("rate limits repeated submissions", () => {
    for (let i = 0; i < 3; i++) processSubmission(contactSchema, { ...validContact, ...meta }, { clientKey: "ip", limiter, now: NOW });
    const r = processSubmission(contactSchema, { ...validContact, ...meta }, { clientKey: "ip", limiter, now: NOW });
    expect(r.status).toBe("error");
    if (r.status === "error") expect(r.message).toMatch(/Too many submissions/);
  });

  it("rejects non-object payloads", () => {
    for (const bad of [null, "x", 42, []]) {
      expect(processSubmission(contactSchema, bad, { clientKey: "ip", limiter, now: NOW }).status).toBe("error");
    }
  });

  it("validates consultation payloads", () => {
    const ok = processSubmission(consultationSchema, { ...validConsultation, ...meta }, { clientKey: "ip2", limiter, now: NOW });
    expect(ok.status).toBe("success");
    const bad = processSubmission(consultationSchema, { ...validConsultation, areas: [], ...meta }, { clientKey: "ip2", limiter, now: NOW });
    expect(bad.status === "error" && bad.fieldErrors?.areas).toBeTruthy();
  });
});
