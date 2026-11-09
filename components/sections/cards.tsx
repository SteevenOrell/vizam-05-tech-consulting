import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { IllustrativeBadge, Tag } from "@/components/ui/primitives";
import { getIndustry } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import type { CaseStudy, Industry, Insight, Service } from "@/lib/content/types";
import { formatDate } from "@/lib/format";

/** With six cards on a three-column grid, wide cards at 0, 3 and 5 make three full rows (2+1, 1+2, 1+2). */
const FEATURE_SPANS = new Set([0, 3, 5]);

const hoverLift = "transition duration-300 ease-[var(--ease-instrument)] hover:-translate-y-0.5 hover:border-ink";

/**
 * Bento directory of services: rounded cards with a large aurora index numeral. Equal height per row; the first
 * card of the grid is wider on desktop when `feature` is set (Home).
 */
export function ServicesIndex({
  items,
  headingLevel = 3,
  feature = false,
}: {
  items: Service[];
  headingLevel?: 2 | 3;
  feature?: boolean;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="services-index">
      {items.map((s, i) => (
        <li key={s.slug} className={feature && FEATURE_SPANS.has(i) ? "lg:col-span-2" : ""}>
          <Link
            href={`/services/${s.slug}`}
            data-card=""
            className={`group card relative flex h-full flex-col overflow-hidden p-6 md:p-7 ${hoverLift}`}
          >
            <GhostNumeral
              value={s.index}
              tone="aurora"
              className="absolute -right-1 -top-3 h-[6.5rem] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
            />
            <span className="mono-label relative text-signal">( {s.index} )</span>
            <H className="relative mt-10 text-[1.45rem] leading-tight tracking-[-0.03em] md:text-[1.7rem]">{s.title}</H>
            <p className="relative mt-3 flex-1 text-graphite">{s.short}</p>
            <span className="relative mt-6 inline-flex items-center gap-1.5 font-mono text-[0.78rem] font-medium uppercase tracking-[0.06em] text-signal">
              Explore
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
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
      className={`group card flex h-full flex-col overflow-hidden ${hoverLift}`}
    >
      <div className="relative m-2 aspect-[3/2] overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] bg-paper-2">
        <Image
          src={industry.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover grayscale-[35%] transition duration-700 ease-[var(--ease-instrument)] group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <H className="text-[1.3rem] leading-tight">{industry.title}</H>
        <p className="mt-2 flex-1 text-[0.97rem] text-graphite">{industry.short}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.78rem] font-medium uppercase tracking-[0.06em] text-signal">
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
      className={`group card flex h-full flex-col overflow-hidden ${hoverLift}`}
    >
      <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] bg-paper-2">
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
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <p className="mono-label text-slate">( {industry?.title} )</p>
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
      className={`group card flex h-full flex-col overflow-hidden ${hoverLift}`}
    >
      <div className="relative m-2 aspect-[16/10] overflow-hidden rounded-[calc(var(--radius-card)-0.5rem)] bg-paper-2">
        <Image
          src={insight.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          className="object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <div className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1 text-slate">
          <span className="text-signal">{insight.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={insight.date}>{formatDate(insight.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{insight.readingTime} min read</span>
        </div>
        <H className="mt-3 text-[1.3rem] leading-snug">
          <span className="link-underline">{insight.title}</span>
        </H>
        <p className="mt-2 flex-1 text-[0.96rem] text-graphite">{insight.excerpt}</p>
      </div>
    </Link>
  );
}
