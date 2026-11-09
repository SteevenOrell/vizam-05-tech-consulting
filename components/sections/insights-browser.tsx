"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { Pagination } from "@/components/ui/pagination";
import { allowed, filterInsights, paginate } from "@/lib/filters";
import type { Insight, InsightCategory } from "@/lib/content/types";

export function insightsHref(category: string | null, page: number) {
  const p = new URLSearchParams();
  if (category) p.set("category", category);
  if (page > 1) p.set("page", String(page));
  const qs = p.toString();
  return qs ? `/insights?${qs}` : "/insights";
}

export function InsightsBrowser({
  items,
  categories,
  perPage,
  cards,
}: {
  items: Insight[];
  categories: InsightCategory[];
  perPage: number;
  cards: Record<string, ReactNode>;
}) {
  const searchParams = useSearchParams();
  const category = allowed(searchParams.get("category"), categories);
  const result = paginate(filterInsights(items, category), searchParams.get("page"), perPage);

  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 py-1.5 font-mono text-[0.76rem] uppercase tracking-[0.05em] transition-colors ${
      active ? "border-ink bg-ink text-ice" : "border-graphite/30 bg-paper text-graphite hover:border-ink hover:text-ink"
    }`;

  return (
    <div>
      <div role="group" aria-labelledby="category-label" className="card flex flex-wrap items-center gap-x-5 gap-y-3 p-5 md:px-7">
        <p id="category-label" className="mono-label text-slate">
          Category
        </p>
        <ul className="flex flex-wrap gap-2">
          {[null, ...categories].map((c) => (
            <li key={c ?? "all"}>
              <Link
                href={insightsHref(c, 1)}
                scroll={false}
                aria-current={category === c ? "true" : undefined}
                className={chip(category === c)}
              >
                {c ?? "All"}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <p className="mono-label mt-6 text-slate" role="status" aria-live="polite" data-testid="results-count">
        {result.total} {result.total === 1 ? "article" : "articles"} · page {result.page} of {result.totalPages}
      </p>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="insights-grid">
        {result.items.map((i) => (
          <li key={i.slug}>{cards[i.slug]}</li>
        ))}
      </ul>
      <Pagination page={result.page} totalPages={result.totalPages} hrefFor={(p) => insightsHref(category, p)} />
    </div>
  );
}
