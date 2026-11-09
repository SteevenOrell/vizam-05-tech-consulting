import type { Metadata } from "next";
import Link from "next/link";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { LinkButton, MicroLabel } from "@/components/ui/primitives";

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
    <section
      className="on-dark relative -mt-[var(--header-h)] overflow-hidden rounded-b-[var(--radius-panel)] bg-ink text-paper"
      aria-labelledby="nf-title"
    >
      <GradientField tone="aurora" focus={[0.88, 0.8]} columns={26} seed={404} />
      <GhostNumeral value="404" tone="dark" variant="outline" className="absolute -bottom-2 right-2 h-[6rem] md:right-10 md:h-[14rem]" />
      <div className="container-x section-y relative pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)]">
        <MicroLabel dark className="text-ice">
          Error 404 · Record not found
        </MicroLabel>
        <h1 id="nf-title" className="mt-6 max-w-[16ch] text-display-xl">
          This page is not in the index.
        </h1>
        <p className="mt-6 max-w-xl text-[1.15rem] text-paper">
          The address may be mistyped, or the page may have moved. Here are the most useful places to continue.
        </p>
        <ul className="mt-10 flex flex-wrap gap-3">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="inline-flex min-h-11 items-center rounded-full border border-ice/35 bg-ink/60 px-5 text-[1.05rem] transition-colors hover:border-phosphor hover:text-phosphor">
                {s.label} →
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <LinkButton href="/" variant="on-dark">
            Back to home
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
