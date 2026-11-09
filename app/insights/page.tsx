import type { Metadata } from "next";
import { Suspense } from "react";
import { InsightCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { InsightsBrowser } from "@/components/sections/insights-browser";
import { PageHeader } from "@/components/sections/page-header";
import { INSIGHTS_PER_PAGE, insightCategories, sortedInsights } from "@/lib/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Perspectives, field notes and guides on technology strategy, data and AI, cloud platforms, resilience and delivery.",
  path: "/insights",
});

export default function InsightsPage() {
  const items = sortedInsights();
  const cards = Object.fromEntries(items.map((i) => [i.slug, <InsightCard key={i.slug} insight={i} headingLevel={2} />]));
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Insights", path: "/insights" }]}
        index="Insights"
        tone="ink"
        ghost="NOTES"
        focus={[0.95, 0.85]}
        seed={16}
        title="Notes from the practice."
        lead="Short, practical writing on the decisions our clients face. Original articles written for this concept site."
      />
      <section className="bg-paper" aria-label="Articles">
        <div className="container-x section-y">
          <Suspense
            fallback={
              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {items.slice(0, INSIGHTS_PER_PAGE).map((i) => (
                  <li key={i.slug}>{cards[i.slug]}</li>
                ))}
              </ul>
            }
          >
            <InsightsBrowser items={items} categories={insightCategories} perPage={INSIGHTS_PER_PAGE} cards={cards} />
          </Suspense>
        </div>
      </section>
      <CtaBand index="02" />
    </>
  );
}
