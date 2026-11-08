"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { allowed, filterCaseStudies } from "@/lib/filters";
import type { CaseStudy } from "@/lib/content/types";

type Option = { slug: string; title: string };

function buildHref(params: URLSearchParams, key: string, value: string | null) {
  const next = new URLSearchParams(params.toString());
  if (value) next.set(key, value);
  else next.delete(key);
  const qs = next.toString();
  return qs ? `/case-studies?${qs}` : "/case-studies";
}

function FilterGroup({
  label,
  param,
  options,
  current,
  params,
}: {
  label: string;
  param: string;
  options: Option[];
  current: string | null;
  params: URLSearchParams;
}) {
  const chip = (active: boolean) =>
    `inline-flex min-h-10 items-center rounded-full border px-4 py-1.5 font-mono text-[0.76rem] uppercase tracking-[0.05em] transition-colors ${
      active ? "border-ink bg-ink text-ice" : "border-graphite/30 bg-paper text-graphite hover:border-ink hover:text-ink"
    }`;
  return (
    <div role="group" aria-labelledby={`filter-${param}`}>
      <p id={`filter-${param}`} className="mono-label mb-3 text-slate">
        {label}
      </p>
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href={buildHref(params, param, null)}
            scroll={false}
            replace
            aria-current={current === null ? "true" : undefined}
            className={chip(current === null)}
          >
            All
          </Link>
        </li>
        {options.map((o) => (
          <li key={o.slug}>
            <Link
              href={buildHref(params, param, o.slug)}
              scroll={false}
              replace
              aria-current={current === o.slug ? "true" : undefined}
              className={chip(current === o.slug)}
            >
              {o.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyBrowser({
  items,
  industries,
  services,
  cards,
}: {
  items: CaseStudy[];
  industries: Option[];
  services: Option[];
  /** Pre-rendered server cards keyed by slug. */
  cards: Record<string, ReactNode>;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const reduce = useReducedMotion();
  const industry = allowed(searchParams.get("industry"), industries.map((i) => i.slug));
  const service = allowed(searchParams.get("service"), services.map((s) => s.slug));
  const results = filterCaseStudies(items, { industry, service });

  return (
    <div>
      <div className="card grid gap-8 p-5 md:p-7 lg:grid-cols-2">
        <FilterGroup label="Filter by industry" param="industry" options={industries} current={industry} params={params} />
        <FilterGroup label="Filter by service" param="service" options={services} current={service} params={params} />
      </div>

      <p className="mono-label mt-6 text-slate" role="status" aria-live="polite" data-testid="results-count">
        {results.length} {results.length === 1 ? "scenario" : "scenarios"} shown
      </p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-[var(--radius-card)] border border-dashed border-graphite/40 p-10 text-center" data-testid="empty-state">
          <p className="text-[1.3rem]">No scenario matches both filters.</p>
          <p className="mt-2 text-graphite">Try another combination, or clear the filters.</p>
          <Link href="/case-studies" scroll={false} replace className="mt-6 inline-flex min-h-11 items-center font-medium text-signal underline">
            Clear filters
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="scenario-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((c) => (
              <motion.li
                key={c.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {cards[c.slug]}
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </div>
  );
}
