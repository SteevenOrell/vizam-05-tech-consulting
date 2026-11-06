import { describe, expect, it } from "vitest";
import { caseStudies } from "@/lib/content/case-studies";
import { insights } from "@/lib/content/insights";
import { allowed, filterCaseStudies, filterInsights, paginate } from "@/lib/filters";
import { formatDate } from "@/lib/format";

describe("filterCaseStudies", () => {
  it("returns everything without filters", () => {
    expect(filterCaseStudies(caseStudies, {})).toHaveLength(caseStudies.length);
  });
  it("filters by industry", () => {
    const r = filterCaseStudies(caseStudies, { industry: "public-sector" });
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((c) => c.industry === "public-sector")).toBe(true);
  });
  it("filters by service", () => {
    const r = filterCaseStudies(caseStudies, { service: "data-ai" });
    expect(r.every((c) => c.services.includes("data-ai"))).toBe(true);
  });
  it("combines filters with AND and can be empty", () => {
    expect(filterCaseStudies(caseStudies, { industry: "financial-services", service: "product-delivery" })).toEqual([]);
  });
});

describe("filterInsights", () => {
  it("filters by category", () => {
    const r = filterInsights(insights, "Guide");
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((i) => i.category === "Guide")).toBe(true);
  });
  it("returns all for null", () => {
    expect(filterInsights(insights, null)).toHaveLength(insights.length);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 8 }, (_, i) => i);
  it("slices pages", () => {
    expect(paginate(items, 1, 6)).toEqual({ items: [0, 1, 2, 3, 4, 5], page: 1, totalPages: 2, total: 8 });
    expect(paginate(items, "2", 6).items).toEqual([6, 7]);
  });
  it("clamps out-of-range and junk input", () => {
    expect(paginate(items, 99, 6).page).toBe(2);
    expect(paginate(items, -3, 6).page).toBe(1);
    expect(paginate(items, "abc", 6).page).toBe(1);
    expect(paginate(items, null, 6).page).toBe(1);
  });
  it("has one page when empty", () => {
    expect(paginate([], 1, 6)).toEqual({ items: [], page: 1, totalPages: 1, total: 0 });
  });
});

describe("allowed", () => {
  it("whitelists query values", () => {
    expect(allowed("a", ["a", "b"] as const)).toBe("a");
    expect(allowed("<script>", ["a", "b"] as const)).toBeNull();
    expect(allowed(null, ["a"] as const)).toBeNull();
  });
});

describe("formatDate", () => {
  it("formats deterministically in UTC", () => {
    expect(formatDate("2026-10-21")).toBe("21 Oct 2026");
  });
});
