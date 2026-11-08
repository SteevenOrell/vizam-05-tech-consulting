import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHeader } from "@/components/sections/page-header";
import { SectionIndex } from "@/components/ui/primitives";
import { site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Halvaren (a fictional VIZAM concept firm). The form is a demo: submissions are validated and then discarded.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        index="Contact"
        tone="ink"
        focus={[0.9, 0.95]}
        seed={31}
        title="Start with a short note."
        lead="For general enquiries, media and partnerships. If you already have a decision in mind, the consultation request asks better questions."
      />
      <section className="bg-paper" aria-labelledby="form-title">
        <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="card p-5 md:p-9 lg:col-span-7">
            <h2 id="form-title" className="sr-only">
              Contact form
            </h2>
            <ContactForm />
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us">
            <SectionIndex n="—" label="Details" />
            <dl className="card mt-6 space-y-6 p-6">
              <div>
                <dt className="mono-label text-slate">Email (fictional)</dt>
                <dd className="mt-1 font-mono">{site.email}</dd>
              </div>
              <div>
                <dt className="mono-label text-slate">Studios (fictional)</dt>
                <dd className="mt-1">
                  <ul className="space-y-1">
                    {site.studios.map((s) => (
                      <li key={s.city}>
                        {s.city} <span className="font-mono text-sm text-slate">{s.zone}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="mono-label text-slate">Response</dt>
                <dd className="mt-1 text-graphite">
                  In a live version: within two working days. In this concept, no message is delivered.
                </dd>
              </div>
            </dl>
            <div className="card-ink on-dark mt-6 p-6">
              <p className="font-medium">Weighing a specific decision?</p>
              <p className="mt-1 text-sm text-mist">The consultation request helps us prepare a useful first session.</p>
              <Link href="/consultation" className="link-underline mt-3 inline-block font-medium text-phosphor">
                Request a consultation →
              </Link>
            </div>
            <p className="mt-8 text-sm text-slate">
              Read the <Link className="underline hover:text-ink" href="/privacy">privacy and demo notice</Link>.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
