import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { roles } from "@/lib/content/careers";
import { caseStudies } from "@/lib/content/case-studies";
import { images } from "@/lib/content/images";
import { industries } from "@/lib/content/industries";
import { insights } from "@/lib/content/insights";
import { services } from "@/lib/content/services";
import { site } from "@/lib/content/site";

const unique = (xs: string[]) => new Set(xs).size === xs.length;
const serviceSlugs = services.map((s) => s.slug);
const industrySlugs = industries.map((i) => i.slug);

describe("content integrity", () => {
  it("has unique slugs in every collection", () => {
    for (const list of [services, industries, caseStudies, insights, roles]) {
      expect(unique(list.map((x) => x.slug))).toBe(true);
    }
  });

  it("uses URL-safe slugs", () => {
    for (const list of [services, industries, caseStudies, insights, roles]) {
      for (const x of list) expect(x.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("resolves every cross-reference", () => {
    for (const s of services) for (const i of s.relatedIndustries) expect(industrySlugs).toContain(i);
    for (const i of industries) for (const s of i.relatedServices) expect(serviceSlugs).toContain(s);
    for (const c of caseStudies) {
      expect(industrySlugs).toContain(c.industry);
      for (const s of c.services) expect(serviceSlugs).toContain(s);
    }
  });

  it("flags every case study as illustrative and every role as demo", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
    for (const c of caseStudies) expect(c.illustrative).toBe(true);
    for (const r of roles) expect(r.demo).toBe(true);
  });

  it("makes no numeric performance claims in case-study outcomes", () => {
    for (const c of caseStudies) {
      for (const text of [...c.intendedOutcomes, ...c.measures, c.summary]) {
        expect(text).not.toMatch(/\d+\s?%|\$\s?\d|€\s?\d|£\s?\d|\b\d+x\b/i);
      }
    }
  });

  it("does not attribute articles to invented people", () => {
    for (const a of insights) expect(a.author).toMatch(/practice$/);
  });

  it("references only image files that exist in /public", () => {
    for (const img of Object.values(images)) {
      expect(img.src).toMatch(/\.webp$/);
      expect(existsSync(join(process.cwd(), "public", img.src))).toBe(true);
      expect(img.alt.length).toBeGreaterThan(10);
    }
  });

  it("labels the site as a fictional VIZAM concept", () => {
    expect(site.conceptNotice).toBe("VIZAM concept project — fictional company");
    expect(site.email.endsWith(".example")).toBe(true);
    expect(site.url).toMatch(/^https?:\/\//);
  });

  it("uses valid ISO dates for insights", () => {
    for (const a of insights) expect(Number.isNaN(Date.parse(a.date))).toBe(false);
  });
});
