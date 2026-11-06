import type { Metadata } from "next";
import { ServicesIndex } from "@/components/sections/cards";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { SectionIndex } from "@/components/ui/primitives";
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
        index="§ Services — directory"
        title="Six practices, one way of working."
        lead="Each practice can lead on its own. Most engagements combine two or three under a single partner and a single set of decision records."
      />
      <section className="section-y pt-14 md:pt-20" aria-label="Service directory">
        <div className="container-x">
          <ServicesIndex items={services} headingLevel={2} />
        </div>
      </section>
      <section className="section-y border-t border-rule bg-paper-2" aria-labelledby="shapes-title">
        <div className="container-x">
          <SectionIndex n="02" label="Engagement shapes" />
          <h2 id="shapes-title" className="mt-5 max-w-3xl text-h2">
            Sized to the decision, not to a staffing plan.
          </h2>
          <ol className="mt-12 grid gap-px border border-rule bg-rule md:grid-cols-3">
            {shapes.map((s, i) => (
              <li key={s.title} className="flex h-full flex-col bg-paper p-6 md:p-8" data-card="">
                <span className="font-mono text-sm text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[1.5rem] leading-tight">{s.title}</h3>
                <p className="mono-label mt-2 text-slate">Typical duration: {s.duration}</p>
                <p className="mt-4 text-graphite">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-slate">
            Durations are indicative ranges for this concept site, not commitments or historical averages.
          </p>
        </div>
      </section>
      <CtaBand index="03" />
    </>
  );
}
