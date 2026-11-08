import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InsightCard } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { Breadcrumbs } from "@/components/sections/page-header";
import { RevealText } from "@/components/motion/reveal-text";
import { GradientField } from "@/components/ui/gradient-field";
import { Plate, Tag } from "@/components/ui/primitives";
import { getInsight, insights, sortedInsights } from "@/lib/content/insights";
import { site } from "@/lib/content/site";
import type { Block } from "@/lib/content/types";
import { formatDate } from "@/lib/format";
import { jsonLdString, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return {};
  return pageMetadata({
    title: insight.title,
    description: insight.excerpt,
    path: `/insights/${slug}`,
    image: insight.image.src,
    type: "article",
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "list":
      return (
        <ul key={i}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote key={i}>
          <p>{block.text}</p>
        </blockquote>
      );
    default:
      return <p key={i}>{block.text}</p>;
  }
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();
  const related = sortedInsights()
    .filter((i) => i.slug !== insight.slug)
    .sort((a, b) => Number(b.category === insight.category) - Number(a.category === insight.category))
    .slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    author: { "@type": "Organization", name: `${site.legalName} — ${insight.author}` },
    publisher: { "@type": "Organization", name: site.legalName },
    image: `${site.url}${insight.image.src}`,
    mainEntityOfPage: `${site.url}/insights/${insight.slug}`,
  };

  return (
    <>
      <article>
        <header className="relative overflow-hidden border-b border-rule bg-paper">
          <GradientField tone="ice" focus={[0.95, 0.1]} columns={22} seed={19} />
          <div className="container-x relative pb-12 pt-8 md:pt-12">
            <Breadcrumbs
              items={[
                { name: "Insights", path: "/insights" },
                { name: insight.title, path: `/insights/${insight.slug}` },
              ]}
            />
            <div className="mt-12 max-w-4xl">
              <p className="mono-label flex flex-wrap gap-x-3 gap-y-1 text-graphite">
                <span className="text-signal">{insight.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{insight.readingTime} min read</span>
              </p>
              <RevealText as="h1" className="mt-5 text-display">
                {insight.title}
              </RevealText>
              <p className="mt-6 max-w-2xl text-[1.2rem] text-graphite">{insight.excerpt}</p>
              <p className="mt-6 text-sm text-slate">
                By the {insight.author} · {site.name} (fictional)
              </p>
            </div>
          </div>
        </header>
        <div className="container-x grid gap-12 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-8">
            <Plate image={insight.image} plate="A" priority sizes="(min-width: 1024px) 60vw, 92vw" aspect="aspect-[16/9]" />
            <div className="prose-article mt-12">{insight.body.map(renderBlock)}</div>
          </div>
          <aside className="lg:col-span-3 lg:col-start-10" aria-label="Article details">
            <div className="lg:sticky lg:top-28">
              <h2 className="mono-label text-slate">( Topics )</h2>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {insight.topics.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <p className="mt-8 border-t border-rule pt-4 text-sm text-graphite">
                Original writing for the Halvaren concept site by VIZAM. It describes general practice, not a real
                engagement.
              </p>
              <Link href="/insights" className="link-underline mt-6 inline-block text-sm text-signal">
                ← All insights
              </Link>
            </div>
          </aside>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(articleLd) }} />
      </article>

      <section className="bg-paper-2" aria-labelledby="related-title">
        <div className="container-x section-y">
          <h2 id="related-title" className="text-display">
            Keep reading.
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <InsightCard insight={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand index="—" />
    </>
  );
}
