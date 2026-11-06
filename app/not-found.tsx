import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

const suggestions = [
  { href: "/services", label: "Services" },
  { href: "/industries", label: "Industries" },
  { href: "/case-studies", label: "Illustrative scenarios" },
  { href: "/insights", label: "Insights" },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden border-b border-rule" aria-labelledby="nf-title">
      <div className="grid-hairlines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x section-y relative">
        <p className="mono-label text-signal">Error 404 · Record not found</p>
        <h1 id="nf-title" className="mt-6 max-w-[16ch] text-display">
          This page is not in the index.
        </h1>
        <p className="mt-6 max-w-xl text-[1.15rem] text-graphite">
          The address may be mistyped, or the page may have moved. Here are the most useful places to continue.
        </p>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="link-underline text-[1.1rem]">
                {s.label} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <LinkButton href="/">Back to home</LinkButton>
        </div>
      </div>
    </section>
  );
}
