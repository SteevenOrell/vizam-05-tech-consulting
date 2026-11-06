import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndustryCard, ScenarioCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { DecisionRecord } from "@/components/ui/decision-record";
import { Plate, SectionIndex } from "@/components/ui/primitives";
import { caseStudies } from "@/lib/content/case-studies";
import { getIndustry } from "@/lib/content/industries";
import { getService, services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.title, description: service.summary, path: `/services/${slug}`, image: service.image.src });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = service.relatedIndustries.map(getIndustry).filter((i) => i !== undefined);
  const scenarios = caseStudies.filter((c) => c.services.includes(service.slug)).slice(0, 3);
  const idx = services.findIndex((s) => s.slug === slug);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        index={`§ Service ${service.index}`}
        title={service.title}
        lead={service.summary}
        aside={
          <dl className="grid gap-4 border-t border-ink pt-4 text-[0.95rem]">
            <div>
              <dt className="mono-label text-slate">Typical shape</dt>
              <dd className="mt-1">{service.engagement.shape}</dd>
            </div>
            <div>
              <dt className="mono-label text-slate">Indicative duration</dt>
              <dd className="mt-1">{service.engagement.duration}</dd>
            </div>
            <div>
              <dt className="mono-label text-slate">Typical team</dt>
              <dd className="mt-1">{service.engagement.team}</dd>
            </div>
          </dl>
        }
      />

      <section className="section-y" aria-labelledby="overview-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex n="01" label="Overview" />
            <h2 id="overview-title" className="sr-only">
              Overview
            </h2>
            <div className="mt-6 space-y-5 text-[1.12rem] text-graphite">
              {service.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Plate image={service.image} plate={service.index} sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
        </div>
      </section>

      <section className="section-y border-t border-rule bg-paper-2" aria-labelledby="questions-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex n="02" label="Questions we help answer" />
            <h2 id="questions-title" className="mt-5 text-h2">
              The questions on the table.
            </h2>
          </div>
          <ol className="border-t border-ink lg:col-span-8">
            {service.questions.map((q, i) => (
              <li key={q} className="flex gap-5 border-b border-rule py-5 text-[1.2rem] leading-snug md:text-[1.35rem]">
                <span className="mt-1 font-mono text-sm text-signal">Q{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y" aria-labelledby="work-title">
        <div className="container-x">
          <SectionIndex n="03" label="What the work involves" />
          <h2 id="work-title" className="mt-5 max-w-3xl text-h2">
            Activities and deliverables.
          </h2>
          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <ul className="grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:col-span-8">
              {service.activities.map((a) => (
                <li key={a.title} className="h-full bg-paper p-6" data-card="">
                  <h3 className="text-[1.2rem] leading-tight">{a.title}</h3>
                  <p className="mt-2 text-graphite">{a.text}</p>
                </li>
              ))}
            </ul>
            <div className="lg:col-span-4">
              <h3 className="mono-label text-slate">Typical deliverables</h3>
              <ul className="mt-4 border-t border-ink">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex gap-3 border-b border-rule py-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y border-t border-rule bg-paper-2" aria-labelledby="dr-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex n="04" label="How we reason" />
            <h2 id="dr-title" className="mt-5 text-h2">
              A typical decision record.
            </h2>
            <p className="mt-5 text-graphite">
              Every engagement produces records like this one, so the reasoning stays with you after we leave.
            </p>
          </div>
          <div className="lg:col-span-8">
            <DecisionRecord record={service.decision} />
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="related-title">
        <div className="container-x">
          <SectionIndex n="05" label="Related" />
          <h2 id="related-title" className="mt-5 text-h2">
            Where this practice works most.
          </h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((i) => (
              <li key={i.slug}>
                <IndustryCard industry={i} />
              </li>
            ))}
          </ul>
          {scenarios.length > 0 && (
            <>
              <h3 className="mono-label mt-16 text-slate">Illustrative scenarios using this practice</h3>
              <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {scenarios.map((c) => (
                  <li key={c.slug}>
                    <ScenarioCard study={c} headingLevel={3} />
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink pt-6">
            <Link href="/services" className="link-underline text-graphite hover:text-ink">
              ← All services
            </Link>
            <Link href={`/services/${next.slug}`} className="group text-right">
              <span className="mono-label block text-slate">Next service · {next.index}</span>
              <span className="link-underline text-[1.2rem]">{next.title} →</span>
            </Link>
          </div>
        </div>
      </section>
      <CtaBand index="06" />
    </>
  );
}
