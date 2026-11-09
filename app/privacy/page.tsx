import type { Metadata } from "next";
import { PageHeader } from "@/components/sections/page-header";
import { site } from "@/lib/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy & demo notice",
  description: "How this concept site handles form data (it discards it) and what is fictional on it.",
  path: "/privacy",
});

const sections = [
  {
    title: "This is a concept site",
    body: [site.conceptLong, "The site was designed and built by VIZAM to demonstrate a corporate consulting website. It is not a commercial offer."],
  },
  {
    title: "Forms",
    body: [
      "The contact and consultation forms validate your answers on the server so that the experience is realistic. After validation the data is discarded: it is not stored in a database, not written to logs, not emailed and not shared with any third party.",
      "To limit abuse, the server keeps a short-lived, in-memory count of recent submissions per connection. The connection address is hashed with a random salt before it is counted and is never stored in readable form; the counter disappears within ten minutes or when the server restarts.",
    ],
  },
  {
    title: "Cookies and tracking",
    body: ["This site sets no cookies and uses no analytics, advertising or third-party tracking scripts. Fonts and images are served from the site itself."],
  },
  {
    title: "Content",
    body: [
      "Case studies are illustrative scenarios, not client work. Job listings are demos and are not open. No testimonials, client logos or performance statistics are shown, because none exist.",
      "Photographs are from Unsplash and used under the Unsplash License; photographers are credited in the project repository.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Privacy & demo notice", path: "/privacy" }]}
        index="Notice"
        tone="paper"
        focus={[0.95, 0.1]}
        seed={41}
        title="Privacy and demo notice."
        lead="Plain answers about what this concept site does with your information: nothing."
      />
      <section className="bg-paper" aria-label="Notice">
        <div className="container-x section-y max-w-3xl">
          {sections.map((s, i) => (
            <div key={s.title} className="card mb-4 p-6 md:p-8">
              <h2 className="flex items-start gap-4 text-[1.5rem] leading-tight">
                <span className="mt-0.5 inline-flex h-7 min-w-9 shrink-0 items-center justify-center rounded-full bg-ink px-2 font-mono text-xs text-ice">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </h2>
              <div className="mt-4 space-y-4 text-graphite">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="mono-label pt-4 text-slate">Last reviewed: 5 November 2026</p>
        </div>
      </section>
    </>
  );
}
