import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { Card, Notice, Plate, SectionIndex } from "@/components/ui/primitives";
import { images } from "@/lib/content/images";
import { commitments, method, site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Why Halvaren exists, how it works and what it will not do. A fictional, independent technology and business consultancy created by VIZAM as a concept project.",
  path: "/about",
});

const notList = [
  "We do not resell software, hardware or cloud capacity.",
  "We do not take referral fees from vendors or integrators.",
  "We do not staff large teams to sustain our own revenue.",
  "We do not publish client logos or testimonials — and as a fictional firm, we have none.",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        index="About"
        tone="aurora"
        ghost="ABOUT"
        focus={[0.95, 0.8]}
        seed={2}
        title="An advisory built around the decision, not the deliverable."
        lead="Halvaren was imagined as a small, senior, independent consultancy for organisations whose technology choices have operational consequences."
      >
        <div className="mt-8 max-w-2xl">
          <Notice title="A VIZAM concept project">{site.conceptLong}</Notice>
        </div>
      </PageHeader>

      <section className="bg-paper" aria-labelledby="purpose-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex n="01" label="Purpose" />
            <h2 id="purpose-title" className="mt-5 text-h2">
              Why the firm exists.
            </h2>
            <div className="mt-6 space-y-5 text-[1.08rem] text-graphite">
              <p>
                Large technology decisions are often made under pressure, with incomplete options and little record of
                why. Years later, organisations live with architectures and contracts nobody can explain.
              </p>
              <p>
                Halvaren&apos;s purpose is to make those decisions deliberate: framed honestly, compared fairly and
                written down, so the people who inherit them can understand, defend or change them.
              </p>
              <p>
                The name joins two halves — business and technology — meeting at a single line. The wordmark draws the
                same idea.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Plate image={images.workingSession} plate="01" sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
        </div>
      </section>

      <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="method-title">
        <GradientField tone="ink" focus={[0.95, 0.1]} columns={22} aspect={2} seed={23} />
        <div className="container-x section-y relative">
          <SectionIndex n="02" label="How we work" dark />
          <h2 id="method-title" className="mt-5 max-w-3xl text-display">
            Four steps, applied at any scale.
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((m) => (
              <li key={m.step}>
                <Card tone="ink" data-card="">
                  <GhostNumeral value={m.step} tone="dark" variant="outline" className="absolute -right-1 -top-2 h-[4.5rem]" />
                  <span className="mono-label relative text-phosphor">( {m.step} )</span>
                  <h3 className="relative mt-8 text-[1.6rem] leading-tight">{m.title}</h3>
                  <p className="relative mt-3 text-mist">{m.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="principles-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionIndex n="03" label="Principles" />
            <h2 id="principles-title" className="mt-5 text-h2">
              What you can hold us to.
            </h2>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {commitments.map((c, i) => (
              <li key={c.title}>
                <Card data-card="">
                  <span className="mono-label text-signal">( {String(i + 1).padStart(2, "0")} )</span>
                  <h3 className="mt-6 text-[1.3rem] leading-tight">{c.title}</h3>
                  <p className="mt-2 text-graphite">{c.text}</p>
                </Card>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-paper-2" aria-labelledby="not-title">
        <div className="container-x section-y grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Plate image={images.studioEvening} plate="02" sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionIndex n="04" label="What we are not" />
            <h2 id="not-title" className="mt-5 text-h2">
              Independence, stated plainly.
            </h2>
            <ul className="card mt-8 divide-y divide-rule px-5">
              {notList.map((n) => (
                <li key={n} className="flex gap-3 py-4">
                  <span aria-hidden="true" className="font-mono text-signal">
                    ✕
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-paper" aria-labelledby="studios-title">
        <div className="container-x section-y">
          <SectionIndex n="05" label="Studios" />
          <h2 id="studios-title" className="mt-5 max-w-3xl text-display">
            Three time zones, one practice.
          </h2>
          <p className="mt-5 max-w-2xl text-graphite">
            The concept places small studios in three cities so that a client always has a partner in a nearby time
            zone. They are fictional: there are no addresses, offices or staff.
          </p>
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {site.studios.map((s, i) => (
              <li key={s.city}>
                <Card data-card="">
                  <p className="mono-label text-slate">
                    Studio {String(i + 1).padStart(2, "0")} · {s.zone}
                  </p>
                  <h3 className="mt-4 text-[2.4rem] leading-none tracking-[-0.04em]">{s.city}</h3>
                  <p className="mt-3 text-graphite">Serving {s.region}</p>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand index="06" />
    </>
  );
}
