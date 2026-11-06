import type { Metadata } from "next";
import { Suspense } from "react";
import { ScenarioCard } from "@/components/sections/cards";
import { CaseStudyBrowser } from "@/components/sections/case-study-browser";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { Notice } from "@/components/ui/primitives";
import { caseStudies } from "@/lib/content/case-studies";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Case studies — illustrative scenarios",
  description:
    "Illustrative scenarios showing how Halvaren (a fictional VIZAM concept firm) would approach technology decisions in six industries. Not real client work.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const industryOptions = industries
    .filter((i) => caseStudies.some((c) => c.industry === i.slug))
    .map(({ slug, title }) => ({ slug, title }));
  const serviceOptions = services
    .filter((s) => caseStudies.some((c) => c.services.includes(s.slug)))
    .map(({ slug, title }) => ({ slug, title }));
  const cards = Object.fromEntries(caseStudies.map((c) => [c.slug, <ScenarioCard key={c.slug} study={c} headingLevel={2} />]));

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Case studies", path: "/case-studies" }]}
        index="§ Case studies"
        title="Illustrative scenarios."
        lead="How our method would apply to realistic situations in each industry we serve."
      >
        <div className="mt-8 max-w-2xl">
          <Notice title="These are not client stories">
            Halvaren is a fictional company created by VIZAM. Every scenario below is illustrative: no real client,
            engagement or result is described, and outcomes are written as intentions and measures, not achievements.
          </Notice>
        </div>
      </PageHeader>
      <section className="section-y pt-12 md:pt-16" aria-label="Browse scenarios">
        <div className="container-x">
          <Suspense
            fallback={
              <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {caseStudies.map((c) => (
                  <li key={c.slug}>{cards[c.slug]}</li>
                ))}
              </ul>
            }
          >
            <CaseStudyBrowser items={caseStudies} industries={industryOptions} services={serviceOptions} cards={cards} />
          </Suspense>
        </div>
      </section>
      <CtaBand index="02" />
    </>
  );
}
