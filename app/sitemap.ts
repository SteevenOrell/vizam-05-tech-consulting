import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/content/case-studies";
import { industries } from "@/lib/content/industries";
import { insights } from "@/lib/content/insights";
import { services } from "@/lib/content/services";
import { site } from "@/lib/content/site";

const LAST_REVIEWED = "2026-11-05";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/services", "/industries", "/case-studies", "/insights", "/careers", "/contact", "/consultation", "/privacy"];
  const entries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${site.url}${p}`,
    lastModified: LAST_REVIEWED,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  for (const s of services) entries.push({ url: `${site.url}/services/${s.slug}`, lastModified: LAST_REVIEWED, priority: 0.8 });
  for (const i of industries) entries.push({ url: `${site.url}/industries/${i.slug}`, lastModified: LAST_REVIEWED, priority: 0.7 });
  for (const c of caseStudies) entries.push({ url: `${site.url}/case-studies/${c.slug}`, lastModified: LAST_REVIEWED, priority: 0.6 });
  for (const a of insights) entries.push({ url: `${site.url}/insights/${a.slug}`, lastModified: a.date, priority: 0.6 });
  return entries;
}
