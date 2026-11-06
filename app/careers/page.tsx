import type { Metadata } from "next";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHeader } from "@/components/sections/page-header";
import { RolesAccordion } from "@/components/sections/roles-accordion";
import { Notice, Plate, SectionIndex } from "@/components/ui/primitives";
import { roles } from "@/lib/content/careers";
import { images } from "@/lib/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "How Halvaren (a fictional VIZAM concept firm) would work as an employer, with demo role listings that are not open for applications.",
  path: "/careers",
});

const values = [
  { title: "Small teams, real responsibility", text: "Engagements are staffed with a few senior people, so everyone's judgement matters." },
  { title: "Writing is part of the job", text: "Clear documents are how we make decisions durable. We coach writing deliberately." },
  { title: "Leave clients stronger", text: "We measure ourselves by how well client teams run things after we step back." },
  { title: "Sustainable pace", text: "Thoughtful work needs rested people. Overtime is the exception, not the model." },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Careers", path: "/careers" }]}
        index="§ Careers"
        title="Work on decisions that matter."
        lead="What working at Halvaren would be like — and the kind of people the concept is designed around."
      >
        <div className="mt-8 max-w-2xl">
          <Notice title="Demo listings — not real vacancies">
            Halvaren is a fictional company. The roles below illustrate a careers page design; they are not open, and
            no applications are collected.
          </Notice>
        </div>
      </PageHeader>

      <section className="section-y" aria-labelledby="culture-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionIndex n="01" label="How we would work" />
            <h2 id="culture-title" className="mt-5 text-h2">
              Senior, small, deliberate.
            </h2>
            <ul className="mt-8 border-t border-ink">
              {values.map((v) => (
                <li key={v.title} className="border-b border-rule py-5">
                  <h3 className="text-[1.15rem] leading-tight">{v.title}</h3>
                  <p className="mt-1.5 text-graphite">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Plate image={images.studioEvening} plate="C" sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
        </div>
      </section>

      <section className="section-y border-t border-rule bg-paper-2" aria-labelledby="roles-title">
        <div className="container-x">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <SectionIndex n="02" label="Demo roles" />
              <h2 id="roles-title" className="mt-5 text-h2">
                Illustrative openings.
              </h2>
            </div>
            <p className="mono-label text-slate">{roles.length} demo listings · not open for applications</p>
          </div>
          <div className="mb-3 hidden grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,3fr)_2.5rem] gap-8 md:grid">
            <span className="mono-label text-slate">Role</span>
            <span className="mono-label text-slate">Practice</span>
            <span className="mono-label text-slate">Location</span>
            <span />
          </div>
          <RolesAccordion roles={roles} />
        </div>
      </section>
      <CtaBand index="03" />
    </>
  );
}
