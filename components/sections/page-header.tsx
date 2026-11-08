import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { RevealText } from "@/components/motion/reveal-text";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { MicroLabel } from "@/components/ui/primitives";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items, dark = false }: { items: Crumb[]; dark?: boolean }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className={`mono-label flex flex-wrap items-center gap-x-2 gap-y-1 ${dark ? "text-mist" : "text-slate"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={dark ? "text-paper" : "text-ink"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className={`link-underline ${dark ? "hover:text-paper" : "hover:text-ink"}`}>
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumbJsonLd(all)) }} />
    </>
  );
}

/**
 * Page header in the Aurora Ledger system.
 * - `aurora`: dark with the bright aurora field on the right (key pages, one per area).
 * - `ink`: dark with the quiet field (default).
 * - `paper`: light with a faint ice field (long-form and legal pages).
 * Dark tones slide under the floating pill header (`-mt-[var(--header-h)]`). `ghost` adds an oversized decorative
 * numeral or word at the bottom right.
 */
export function PageHeader({
  crumbs,
  index,
  title,
  lead,
  children,
  aside,
  tone = "ink",
  size = "lg",
  ghost,
  focus,
  seed = 3,
}: {
  crumbs: Crumb[];
  index: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
  tone?: "aurora" | "ink" | "paper";
  size?: "xl" | "lg";
  ghost?: string;
  focus?: [number, number];
  seed?: number;
}) {
  const dark = tone !== "paper";
  const fieldFocus: [number, number] = focus ?? (tone === "aurora" ? [0.9, 0.85] : tone === "ink" ? [0.92, 0.2] : [0.95, 0.1]);
  const surface = dark
    ? "on-dark -mt-[var(--header-h)] bg-ink text-paper rounded-b-[var(--radius-panel)]"
    : "bg-paper text-ink border-b border-rule";
  return (
    <section className={`relative overflow-hidden ${surface}`}>
      <GradientField
        tone={tone === "paper" ? "ice" : tone}
        focus={fieldFocus}
        columns={tone === "aurora" ? 26 : 22}
        seed={seed}
      />
      {ghost && (
        <GhostNumeral
          value={ghost}
          tone={dark ? "dark" : "light"}
          variant="outline"
          className="absolute -bottom-3 right-2 h-[5.5rem] md:right-8 md:h-[10rem] lg:h-[13rem]"
        />
      )}
      <div
        className={`container-x relative pb-14 md:pb-20 ${
          dark ? "pt-[calc(var(--header-h)+1.5rem)] md:pt-[calc(var(--header-h)+2.5rem)]" : "pt-8 md:pt-12"
        }`}
      >
        <Breadcrumbs items={crumbs} dark={dark} />
        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="relative z-10 lg:col-span-8">
            <MicroLabel dark={dark} className={`mb-5 ${dark ? "text-ice" : ""}`}>
              {index}
            </MicroLabel>
            <RevealText as="h1" className={size === "xl" ? "text-display-xl" : "text-display"}>
              {title}
            </RevealText>
            {lead && (
              <p className={`mt-6 max-w-2xl text-[1.15rem] md:text-[1.25rem] ${dark ? "text-paper" : "text-graphite"}`}>
                {lead}
              </p>
            )}
            {children}
          </div>
          {aside && <div className="relative z-10 lg:col-span-4">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
