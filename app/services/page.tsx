import type { Metadata } from "next";
import { ServicesIndex } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { Card, SectionIndex } from "@/components/ui/primitives";
import { services } from "@/lib/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Six consulting practices: technology strategy, data and AI, cloud modernisation, cybersecurity and resilience, operating model, and digital product delivery.",
  path: "/services",
});

const shapes = [
  { title: "Diagnostic", duration: "2–4 weeks", text: "A focused assessment that frames the decision, the options and what it would take to choose well." },
  { title: "Design", duration: "6–14 weeks", text: "Target architecture, operating model or roadmap, with decision records and a sequenced plan." },
  { title: "Guided delivery", duration: "3–12 months", text: "Blended teams that prove the design in practice and transfer ownership as they go." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        index="Services · directory"
        title="Six practices, one way of working."
        lead="Each practice can lead on its own. Most engagements combine two or three under a single partner and a single set of decision records."
        tone="aurora"
        ghost="06"
        seed={4}
      />
      <section className="bg-paper" aria-label="Service directory">
        <div className="container-x section-y">
          <ServicesIndex items={services} headingLevel={2} feature />
        </div>
      </section>
      <section className="on-dark relative overflow-hidden bg-ink text-paper" aria-labelledby="shapes-title">
        <GradientField tone="ink" focus={[0.96, 0.05]} columns={22} aspect={1.7} seed={14} />
        <div className="container-x section-y relative">
          <SectionIndex n="02" label="Engagement shapes" dark />
          <h2 id="shapes-title" className="mt-5 max-w-3xl text-display">
            Sized to the decision, not to a staffing plan.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {shapes.map((s, i) => (
              <li key={s.title}>
                <Card tone="ink" data-card="" className="min-h-[16rem]">
                  <GhostNumeral
                    value={String(i + 1).padStart(2, "0")}
                    tone="dark"
                    variant="outline"
                    className="absolute -right-1 -top-2 h-[5.5rem]"
                  />
                  <span className="mono-label relative text-phosphor">( {String(i + 1).padStart(2, "0")} )</span>
                  <h3 className="relative mt-auto pt-10 text-[1.6rem] leading-tight">{s.title}</h3>
                  <p className="mono-label mt-2 text-mist">Typical duration: {s.duration}</p>
                  <p className="mt-4 text-paper">{s.text}</p>
                </Card>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-mist">
            Durations are indicative ranges for this concept site, not commitments or historical averages.
          </p>
        </div>
      </section>
      <CtaBand index="03" />
    </>
  );
}
