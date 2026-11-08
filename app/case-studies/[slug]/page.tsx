import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScenarioCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { DecisionRecord } from "@/components/ui/decision-record";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { Card, IllustrativeBadge, Notice, Plate, SectionIndex, Tag } from "@/components/ui/primitives";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { getIndustry } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.title} (illustrative scenario)`,
    description: `Illustrative scenario, not a real client: ${study.summary}`,
    path: `/case-studies/${slug}`,
    image: study.image.src,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const industry = getIndustry(study.industry);
  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Case studies", path: "/case-studies" },
          { name: study.title, path: `/case-studies/${study.slug}` },
        ]}
        index={`Scenario · ${industry?.title ?? ""}`}
        tone="ink"
        focus={[0.9, 0.12]}
        seed={study.slug.length + 50}
        title={study.title}
        lead={study.summary}
        aside={
          <div className="card-glass on-dark space-y-4 p-5">
            <IllustrativeBadge long />
            <dl className="grid gap-4 border-t border-rule-dark pt-4 text-[0.95rem]">
              <div>
                <dt className="mono-label text-mist">Industry</dt>
                <dd className="mt-1">
                  {industry && (
                    <Link className="link-underline" href={`/industries/${industry.slug}`}>
                      {industry.title}
                    </Link>
                  )}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-mist">Practices</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.services.map((s) => (
                    <Tag key={s} dark>
                      {getService(s)?.title ?? s}
                    </Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      <section className="bg-paper" aria-labelledby="situation-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex n="01" label="Situation" />
            <h2 id="situation-title" className="mt-5 text-h2">
              The starting point.
            </h2>
            <div className="mt-6 space-y-5 text-[1.08rem] text-graphite">
              {study.situation.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Plate image={study.image} plate="S" sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="approach-title">
        <GradientField tone="aurora" focus={[0.05, 1.1]} columns={30} aspect={2} seed={36} />
        <div className="container-x section-y relative">
          <SectionIndex n="02" label="Approach" dark />
          <h2 id="approach-title" className="mt-5 text-display">
            How we would run it.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {study.approach.map((a, i) => (
              <li key={a.phase}>
                <Card tone="glass" data-card="">
                  <GhostNumeral
                    value={String(i + 1).padStart(2, "0")}
                    tone="dark"
                    variant="outline"
                    className="absolute -right-1 -top-2 h-[4.5rem]"
                  />
                  <span className="mono-label relative text-ice">Step {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="relative mt-8 text-[1.5rem] leading-tight">{a.phase}</h3>
                  <p className="relative mt-3 text-paper">{a.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="decisions-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex n="03" label="Key decision" />
            <h2 id="decisions-title" className="mt-5 text-h2">
              The choice that shapes the rest.
            </h2>
          </div>
          <div className="space-y-8 lg:col-span-8">
            {study.decisions.map((d) => (
              <DecisionRecord key={d.id} record={d} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper-2" aria-labelledby="outcomes-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex n="04" label="Intended outcomes" />
            <h2 id="outcomes-title" className="mt-5 text-h2">
              What success would look like.
            </h2>
            <div className="mt-6">
              <Notice title="No results are claimed">
                This is an illustrative scenario. The outcomes are intentions and the measures are what we would track;
                none are reported results.
              </Notice>
            </div>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:col-span-8">
            <div>
              <h3 className="mono-label text-slate">Intended outcomes</h3>
              <ul className="card mt-3 divide-y divide-rule px-5">
                {study.intendedOutcomes.map((o) => (
                  <li key={o} className="flex gap-3 py-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label text-slate">Measures we would track</h3>
              <ul className="card mt-3 divide-y divide-rule px-5">
                {study.measures.map((m) => (
                  <li key={m} className="flex gap-3 py-3 font-mono text-[0.9rem]">
                    <span aria-hidden="true" className="text-signal">
                      →
                    </span>
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="more-title">
        <div className="container-x section-y">
          <h2 id="more-title" className="text-h2">
            Other scenarios.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <li key={c.slug}>
                <ScenarioCard study={c} />
              </li>
            ))}
          </ul>
          <div className="mt-16 border-t border-rule pt-6">
            <Link href="/case-studies" className="link-underline text-graphite hover:text-ink">
              ← All scenarios
            </Link>
          </div>
        </div>
      </section>
      <CtaBand index="05" />
    </>
  );
}
