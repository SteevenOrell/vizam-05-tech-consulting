import type { Metadata } from "next";
import { DrawLines } from "@/components/motion/draw-lines";
import { HighlightText } from "@/components/motion/highlight-text";
import { MethodTimeline } from "@/components/motion/method-timeline";
import { RevealText } from "@/components/motion/reveal-text";
import { IndustryCard, InsightCard, ScenarioCard, ServicesIndex } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { LinkButton, Plate, SectionIndex, TextLink } from "@/components/ui/primitives";
import { caseStudies } from "@/lib/content/case-studies";
import { images } from "@/lib/content/images";
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
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-rule" aria-label="Introduction">
        <DrawLines />
        <div className="container-x relative pb-16 pt-10 md:pb-24 md:pt-14">
          <div className="mono-label flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4 text-slate">
            <span>
              <span className="text-signal">Index 00</span> — Independent technology &amp; business consulting
            </span>
            <span className="hidden sm:inline">Lisbon · Toronto · Singapore — fictional studios</span>
          </div>

          <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12 lg:items-end">
            <RevealText as="h1" className="max-w-[14ch] text-display-xl lg:col-span-8" delay={0.15}>
              {site.tagline}
            </RevealText>
            <dl
              aria-label="Open decision record"
              className="hidden border border-ink bg-paper text-[0.9rem] lg:col-span-4 lg:block"
            >
              <div className="flex justify-between bg-ink px-4 py-2.5">
                <dt className="mono-label text-phosphor">DR-00</dt>
                <dd className="mono-label text-mist">Status: open</dd>
              </div>
              <div className="border-b border-rule px-4 py-3">
                <dt className="mono-label text-slate">Context</dt>
                <dd className="mt-1 text-graphite">The technology decision your organisation is weighing now.</dd>
              </div>
              <div className="border-b border-rule px-4 py-3">
                <dt className="mono-label text-slate">Options</dt>
                <dd className="mt-1 text-graphite">At least two credible ones, honestly described.</dd>
              </div>
              <div className="px-4 py-3">
                <dt className="mono-label text-signal">Decision</dt>
                <dd className="mt-1 text-ink">Recorded, reasoned, and reviewable.</dd>
              </div>
            </dl>
          </div>

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <p className="max-w-md text-[1.15rem] text-graphite md:text-[1.25rem]">
                We help leadership teams in regulated and asset-heavy organisations decide what to build, buy, change
                and stop — and we write those decisions down.
              </p>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                <LinkButton href="/consultation">Request a consultation</LinkButton>
                <LinkButton href="/services" variant="secondary">
                  Explore services
                </LinkButton>
              </div>
            </div>
            <div className="lg:col-span-7">
              <Plate
                image={images.hero}
                plate="00"
                priority
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 56vw, 92vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Position */}
      <section className="section-y" aria-labelledby="position-title">
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
