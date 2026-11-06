import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { IllustrativeBadge, Tag } from "@/components/ui/primitives";
import { getIndustry } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import type { CaseStudy, Industry, Insight, Service } from "@/lib/content/types";
import { formatDate } from "@/lib/format";

/** Indexed table of services: the primary directory pattern (rows, not cards). */
export function ServicesIndex({ items, headingLevel = 3 }: { items: Service[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="border-t border-ink" data-testid="services-index">
      {items.map((s) => (
        <li key={s.slug} className="border-b border-rule">
          <Link
            href={`/services/${s.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-2 py-7 transition-colors hover:bg-paper-2 md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,6fr)_auto] md:items-center md:gap-x-8 md:px-3"
          >
            <span className="font-mono text-sm text-signal">{s.index}</span>
            <H className="text-[1.35rem] leading-tight tracking-[-0.025em] md:text-[1.6rem]">{s.title}</H>
            <ArrowUpRight
              aria-hidden="true"
              className="size-5 text-slate transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink md:order-last"
            />
            <p className="col-span-2 col-start-2 text-graphite md:col-span-1 md:col-start-auto">{s.short}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function IndustryCard({ industry, headingLevel = 3 }: { industry: Industry; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/industries/${industry.slug}`}
      data-card=""
      className="group flex h-full flex-col border border-rule bg-paper transition-colors hover:border-ink"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-paper-2">
        <Image
          src={industry.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover grayscale-[35%] transition duration-700 ease-[var(--ease-instrument)] group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <H className="text-[1.3rem] leading-tight">{industry.title}</H>
        <p className="mt-2 flex-1 text-[0.97rem] text-graphite">{industry.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal">
          Industry solutions
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ScenarioCard({ study, headingLevel = 3 }: { study: CaseStudy; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const industry = getIndustry(study.industry);
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      data-card=""
      className="group flex h-full flex-col border border-rule bg-paper transition-colors hover:border-ink"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
        <Image
          src={study.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-700 ease-[var(--ease-instrument)] group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3">
          <IllustrativeBadge />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="mono-label text-slate">{industry?.title}</p>
        <H className="mt-2 text-[1.25rem] leading-snug">{study.title}</H>
        <p className="mt-2 flex-1 text-[0.95rem] text-graphite">{study.summary}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {study.services.map((s) => (
            <Tag key={s}>{getService(s)?.title ?? s}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function InsightCard({ insight, headingLevel = 3 }: { insight: Insight; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link
      href={`/insights/${insight.slug}`}
      data-card=""
      className="group flex h-full flex-col border-t border-ink pt-5"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
        <Image
          src={insight.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover grayscale transition duration-700 group-hover:grayscale-0"
        />
      </div>
      <div className="mono-label mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-slate">
        <span className="text-signal">{insight.category}</span>
        <span aria-hidden="true">·</span>
        <time dateTime={insight.date}>{formatDate(insight.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{insight.readingTime} min read</span>
      </div>
      <H className="mt-2 text-[1.3rem] leading-snug">
        <span className="link-underline">{insight.title}</span>
      </H>
      <p className="mt-2 flex-1 text-[0.96rem] text-graphite">{insight.excerpt}</p>
    </Link>
  );
}
