import type { Metadata } from "next";
import { IndustryCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { industries } from "@/lib/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Industry solutions for financial services, energy and utilities, health and life sciences, manufacturing, transport and logistics, and the public sector.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Industries", path: "/industries" }]}
        index="Industries"
        tone="ink"
        ghost="06"
        focus={[0.9, 0.9]}
        seed={8}
        title="Where the stakes are operational."
        lead="We focus on sectors where technology failures stop real services. Each has its own regulators, risks and rhythms; our method stays the same."
      />
      <section className="bg-paper" aria-label="Industry list">
        <div className="container-x section-y">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="industries-grid">
            {industries.map((i) => (
              <li key={i.slug}>
                <IndustryCard industry={i} headingLevel={2} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand index="02" />
    </>
  );
}
