import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { HeroGlyph } from "@/components/motion/hero-glyph";
import { HighlightText } from "@/components/motion/highlight-text";
import { MethodTimeline } from "@/components/motion/method-timeline";
import { RevealText } from "@/components/motion/reveal-text";
import { IndustryCard, InsightCard, ScenarioCard, ServicesIndex } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { GradientField } from "@/components/ui/gradient-field";
import { LinkButton, MicroLabel, SectionIndex, TextLink } from "@/components/ui/primitives";
import { caseStudies } from "@/lib/content/case-studies";
import { industries } from "@/lib/content/industries";
import { sortedInsights } from "@/lib/content/insights";
import { services } from "@/lib/content/services";
import { commitments, site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Independent technology & business consulting",
    description:
      "Halvaren (a fictional VIZAM concept firm) helps regulated and asset-heavy organisations make technology decisions deliberately: strategy, data and AI, cloud, resilience and delivery.",
    path: "/",
  }),
  title: { absolute: `${site.name} — ${site.tagline}` },
};

export default function HomePage() {
  const latest = sortedInsights().slice(0, 3);
  return (
    <>
      {/* Hero: dark aurora field under the floating pill header */}
      <section
        className="on-dark relative -mt-[var(--header-h)] overflow-hidden rounded-b-[var(--radius-panel)] bg-ink text-paper"
        aria-label="Introduction"
      >
        <GradientField tone="aurora" focus={[0.84, 0.7]} columns={28} seed={5} />
        <div className="container-x relative flex flex-col pb-8 pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)] lg:min-h-[max(42rem,100svh)]">
          <div className="grid flex-1 items-center gap-10 lg:grid-cols-12">
            <div className="relative z-10 lg:col-span-7">
              <MicroLabel dark className="text-ice">
                We are Halvaren · independent technology &amp; business consulting
              </MicroLabel>
              <RevealText as="h1" className="mt-6 max-w-[11ch] text-hero uppercase" delay={0.15}>
                {site.tagline}
              </RevealText>
              <p className="mt-8 max-w-md text-[1.1rem] text-paper md:text-[1.2rem]">
                We help leadership teams in regulated and asset-heavy organisations decide what to build, buy, change
                and stop — and we write those decisions down.
              </p>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row">
                <LinkButton href="/consultation" variant="on-dark">
                  Request a consultation
                </LinkButton>
                <LinkButton href="/services" variant="ghost-dark">
                  Explore services
                </LinkButton>
              </div>
            </div>
            <div className="relative lg:col-span-5">
              <HeroGlyph className="mx-auto block w-full max-w-[22rem] md:max-w-[28rem] lg:max-w-none" />
            </div>
          </div>
          <div className="mono-label mt-12 flex flex-wrap items-end justify-between gap-4 text-ice">
            <a href="#position" className="inline-flex items-center gap-2 rounded-full hover:text-paper">
              Scroll for more
              <ArrowDown aria-hidden="true" className="size-3.5" />
            </a>
            <span>Lisbon · Toronto · Singapore — fictional studios</span>
          </div>
        </div>
      </section>

      {/* Position */}
      <section id="position" className="section-y scroll-mt-[var(--header-h)]" aria-labelledby="position-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionIndex n="01" label="Position" />
            <h2 id="position-title" className="sr-only">
              Our position
            </h2>
          </div>
          <div className="lg:col-span-9">
            <HighlightText
              className="text-[1.6rem] leading-[1.25] tracking-[-0.025em] md:text-[2.4rem] lg:text-[2.75rem]"
              text="Most technology problems are decision problems in disguise. Choices made by default, by vendor or by the loudest meeting harden into architecture that nobody can explain. We bring structure to those decisions: credible options, explicit trade-offs, and records that outlast the people who made them."
            />
            <div className="mt-10 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3">
              {["Independent: no resale, no referral fees", "Senior: small teams, partner-led", "Temporary: built to hand over"].map(
                (t) => {
                  const [k, v] = t.split(": ");
                  return (
                    <p key={k} className="text-[0.95rem] text-graphite">
                      <span className="mono-label block text-ink">{k}</span>
                      {v}
                    </p>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-y border-t border-rule pt-16 md:pt-20" aria-labelledby="services-title">
        <div className="container-x">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIndex n="02" label="Services" />
              <h2 id="services-title" className="mt-5 text-h2">
                Six practices, one way of working.
              </h2>
            </div>
            <p className="text-graphite lg:col-span-5">
              Each practice can lead an engagement on its own. Most work combines two or three, under one partner and
              one set of decision records.
            </p>
          </div>
          <ServicesIndex items={services} />
          <div className="mt-8">
            <TextLink href="/services">All services and engagement shapes</TextLink>
          </div>
        </div>
      </section>

      {/* Method */}
      <section className="on-dark relative bg-ink text-paper" aria-labelledby="method-title">
        <div className="grid-hairlines-dark pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x section-y relative grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionIndex n="03" label="Method" dark />
              <h2 id="method-title" className="mt-5 text-h2">
                Orient. Decide. Build. Hand over.
              </h2>
              <p className="mt-6 max-w-md text-mist">
                The same four steps apply to a two-week diagnostic and a two-year programme. What changes is the depth,
                never the order.
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <MethodTimeline />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-y" aria-labelledby="industries-title">
        <div className="container-x">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIndex n="04" label="Industries" />
              <h2 id="industries-title" className="mt-5 text-h2">
                Where the stakes are operational.
              </h2>
            </div>
            <p className="text-graphite lg:col-span-5">
              We focus on sectors where technology failures stop real services: money, energy, care, production,
              movement and government.
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-testid="industries-grid">
            {industries.map((i) => (
              <li key={i.slug}>
                <IndustryCard industry={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Scenarios */}
      <section className="section-y border-t border-rule bg-paper-2" aria-labelledby="scenarios-title">
        <div className="container-x">
          <div className="mb-10 grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionIndex n="05" label="Illustrative scenarios" />
              <h2 id="scenarios-title" className="mt-5 text-h2">
                How we would approach it.
              </h2>
            </div>
            <p className="text-graphite lg:col-span-5">
              Halvaren is a fictional firm, so it has no client stories. These scenarios show our method applied to
              realistic situations. They are not real engagements and report no results.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.slice(0, 3).map((c) => (
              <li key={c.slug}>
                <ScenarioCard study={c} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TextLink href="/case-studies">Browse all scenarios</TextLink>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="section-y" aria-labelledby="commitments-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex n="06" label="Commitments" />
            <h2 id="commitments-title" className="mt-5 text-h2">
              What you can hold us to.
            </h2>
          </div>
          <ol className="grid border-t border-ink sm:grid-cols-2 lg:col-span-8">
            {commitments.map((c, i) => (
              <li key={c.title} className="border-b border-rule py-7 sm:odd:pr-8 sm:even:border-l sm:even:pl-8">
                <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-[1.3rem] leading-tight">{c.title}</h3>
                <p className="mt-2 text-graphite">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Insights */}
      <section className="section-y border-t border-rule" aria-labelledby="insights-title">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionIndex n="07" label="Insights" />
              <h2 id="insights-title" className="mt-5 text-h2">
                Notes from the practice.
              </h2>
            </div>
            <TextLink href="/insights">All insights</TextLink>
          </div>
          <ul className="grid gap-8 md:grid-cols-3">
            {latest.map((a) => (
              <li key={a.slug}>
                <InsightCard insight={a} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand index="08" />
    </>
  );
}
