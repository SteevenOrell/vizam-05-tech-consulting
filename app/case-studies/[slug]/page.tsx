import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScenarioCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { DecisionRecord } from "@/components/ui/decision-record";
import { IllustrativeBadge, Notice, Plate, SectionIndex, Tag } from "@/components/ui/primitives";
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
        index={`§ Scenario · ${industry?.title ?? ""}`}
        title={study.title}
        lead={study.summary}
        aside={
          <div className="space-y-4">
            <IllustrativeBadge long />
            <dl className="grid gap-4 border-t border-ink pt-4 text-[0.95rem]">
              <div>
                <dt className="mono-label text-slate">Industry</dt>
                <dd className="mt-1">
                  {industry && (
                    <Link className="link-underline" href={`/industries/${industry.slug}`}>
                      {industry.title}
                    </Link>
                  )}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-slate">Practices</dt>
                <dd className="mt-2 flex flex-wrap gap-1.5">
                  {study.services.map((s) => (
                    <Tag key={s}>{getService(s)?.title ?? s}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      <section className="section-y" aria-labelledby="situation-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
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

      <section className="section-y on-dark relative bg-ink text-paper" aria-labelledby="approach-title">
        <div className="grid-hairlines-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative">
          <SectionIndex n="02" label="Approach" dark />
          <h2 id="approach-title" className="mt-5 text-h2">
            How we would run it.
          </h2>
          <ol className="mt-12 grid gap-px border border-rule-dark bg-rule-dark md:grid-cols-2 lg:grid-cols-4">
            {study.approach.map((a, i) => (
              <li key={a.phase} className="h-full bg-ink p-6" data-card="">
                <span className="font-mono text-sm text-phosphor">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.5rem] leading-tight">{a.phase}</h3>
                <p className="mt-3 text-mist">{a.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y" aria-labelledby="decisions-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
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

      <section className="section-y border-t border-rule bg-paper-2" aria-labelledby="outcomes-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
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
              <ul className="mt-3 border-t border-ink">
                {study.intendedOutcomes.map((o) => (
                  <li key={o} className="flex gap-3 border-b border-rule py-3">
                    <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mono-label text-slate">Measures we would track</h3>
              <ul className="mt-3 border-t border-ink">
                {study.measures.map((m) => (
                  <li key={m} className="flex gap-3 border-b border-rule py-3 font-mono text-[0.9rem]">
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

      <section className="section-y" aria-labelledby="more-title">
        <div className="container-x">
          <h2 id="more-title" className="text-h2">
            Other scenarios.
          </h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <li key={c.slug}>
                <ScenarioCard study={c} />
              </li>
            ))}
          </ul>
          <div className="mt-16 border-t border-ink pt-6">
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
