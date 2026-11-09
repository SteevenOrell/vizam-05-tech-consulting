import type { Metadata } from "next";
import Link from "next/link";
import { ConsultationForm } from "@/components/forms/consultation-form";
import { PageHeader } from "@/components/sections/page-header";
import { SectionIndex } from "@/components/ui/primitives";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { method } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Request a consultation",
  description:
    "Request a first working session with Halvaren (a fictional VIZAM concept firm). Demo form: submissions are validated on the server and then discarded.",
  path: "/consultation",
});

export default function ConsultationPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Request a consultation", path: "/consultation" }]}
        index="Consultation"
        tone="aurora"
        ghost="START"
        focus={[0.94, 0.9]}
        seed={6}
        title="Bring us the decision you are weighing."
        lead="Four short sections. Your answers shape the first working session, so it starts with your problem rather than our credentials."
      />
      <section className="bg-paper" aria-labelledby="form-title">
        <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="card p-5 md:p-9 lg:col-span-7">
            <h2 id="form-title" className="sr-only">
              Consultation request form
            </h2>
            <ConsultationForm
              industries={industries.map(({ slug, title }) => ({ slug, title }))}
              services={services.map(({ slug, title }) => ({ slug, title }))}
            />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="What happens next">
            <div className="lg:sticky lg:top-28">
              <SectionIndex n="—" label="What happens next" />
              <ol className="card mt-6 divide-y divide-rule px-5">
                {[
                  "A partner reads your request and replies within two working days (in a live version).",
                  "A 60-minute working session to frame the decision and the options.",
                  "A short written note: what we heard, what we would want to know, and whether we are the right fit.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4 py-4">
                    <span className="inline-flex h-7 min-w-9 shrink-0 items-center justify-center rounded-full bg-ink px-2 font-mono text-xs text-ice">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-graphite">{t}</span>
                  </li>
                ))}
              </ol>
              <p className="mono-label mt-8 text-slate">Our method</p>
              <p className="mt-2 text-graphite">{method.map((m) => m.title).join(" → ")}</p>
              <p className="mt-8 text-sm text-slate">
                This is a demo. Read the <Link className="underline hover:text-ink" href="/privacy">privacy and demo notice</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
