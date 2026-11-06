import type { CaseStudy, Insight, InsightCategory } from "./content/types";

export function filterCaseStudies(
  items: CaseStudy[],
  { industry, service }: { industry?: string | null; service?: string | null },
) {
  return items.filter(
    (c) => (!industry || c.industry === industry) && (!service || c.services.includes(service)),
  );
}

export function filterInsights(items: Insight[], category?: string | null) {
  if (!category) return items;
  return items.filter((i) => i.category === (category as InsightCategory));
}

export type Page<T> = { items: T[]; page: number; totalPages: number; total: number };

/** Clamp the requested page to the valid range and return that slice. */
export function paginate<T>(items: T[], requested: number | string | null | undefined, perPage: number): Page<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const parsed = typeof requested === "number" ? requested : Number.parseInt(String(requested ?? "1"), 10);
  const page = Number.isFinite(parsed) ? Math.min(Math.max(1, Math.trunc(parsed)), totalPages) : 1;
  const start = (page - 1) * perPage;
  return { items: items.slice(start, start + perPage), page, totalPages, total: items.length };
}

/** Keep only allowed values from a query parameter; anything else becomes null. */
export function allowed<T extends string>(value: string | null | undefined, options: readonly T[]): T | null {
  return value && (options as readonly string[]).includes(value) ? (value as T) : null;
}
