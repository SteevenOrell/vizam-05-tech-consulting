import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScenarioCard, ServicesIndex } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { GradientField } from "@/components/ui/gradient-field";
import { Card, Plate, SectionIndex } from "@/components/ui/primitives";
import { caseStudies } from "@/lib/content/case-studies";
import { getIndustry, industries } from "@/lib/content/industries";
import { getService } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: `${industry.title} solutions`,
    description: industry.summary,
    path: `/industries/${slug}`,
    image: industry.image.src,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const relatedServices = industry.relatedServices.map(getService).filter((s) => s !== undefined);
  const scenarios = caseStudies.filter((c) => c.industry === industry.slug);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: industry.title, path: `/industries/${industry.slug}` },
        ]}
        index="Industry solutions"
        tone="ink"
        focus={[0.08, 0.95]}
        seed={industry.slug.length + 40}
        title={industry.title}
        lead={industry.summary}
      />

      <section className="bg-paper" aria-labelledby="context-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Plate image={industry.image} plate="I" sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionIndex n="01" label="Context" />
            <h2 id="context-title" className="mt-5 text-h2">
              The situation.
            </h2>
            <div className="mt-6 space-y-5 text-[1.08rem] text-graphite">
              {industry.context.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <h3 className="mono-label mt-10 text-slate">Pressures we see</h3>
            <ul className="card mt-3 divide-y divide-rule px-5">
              {industry.pressures.map((p) => (
                <li key={p} className="flex gap-3 py-3">
                  <span aria-hidden="true" className="mt-[0.75em] h-px w-3 shrink-0 bg-signal" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="solutions-title">
        <GradientField tone="aurora" focus={[0.5, 1.1]} columns={30} aspect={2} seed={27} />
        <div className="container-x section-y relative">
          <SectionIndex n="02" label="Solutions" dark />
          <h2 id="solutions-title" className="mt-5 max-w-3xl text-display">
            What we would typically put in place.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {industry.solutions.map((s, i) => (
              <li key={s.title}>
                <Card tone="glass" data-card="">
                  <span className="mono-label text-ice">( S{i + 1} )</span>
                  <h3 className="mt-6 text-[1.4rem] leading-tight">{s.title}</h3>
                  <p className="mt-3 text-paper">{s.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="services-title">
        <div className="container-x section-y">
          <SectionIndex n="03" label="Practices involved" />
          <h2 id="services-title" className="mt-5 text-h2">
            Relevant services.
          </h2>
          <div className="mt-10">
            <ServicesIndex items={relatedServices} />
          </div>
          {scenarios.length > 0 && (
            <>
              <h2 className="mono-label mt-16 text-slate">Illustrative scenarios in {industry.title.toLowerCase()}</h2>
              <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {scenarios.map((c) => (
                  <li key={c.slug}>
                    <ScenarioCard study={c} />
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="mt-16 border-t border-rule pt-6">
            <Link href="/industries" className="link-underline text-graphite hover:text-ink">
              ← All industries
            </Link>
          </div>
        </div>
      </section>
      <CtaBand index="04" />
    </>
  );
}
