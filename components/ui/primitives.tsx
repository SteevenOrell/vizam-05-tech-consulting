import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, FlaskConical, Info } from "lucide-react";
import type { ElementType, ReactNode } from "react";
import type { ImageRef } from "@/lib/content/types";

/**
 * Aurora Ledger primitives. Usage rules: docs/design-direction.md §10.
 * Variant names from the first theme are kept so pages that are not restyled yet keep working.
 */

/** Small mono label in brackets, e.g. "( 02 · Services )". The number is coloured with the accent. */
export function SectionIndex({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className={`mono-label flex flex-wrap items-center gap-x-2 ${dark ? "text-mist" : "text-slate"}`}>
      <span aria-hidden="true">(</span>
      <span className={dark ? "text-phosphor" : "text-signal"}>{n}</span>
      <span aria-hidden="true">·</span>
      <span>{label}</span>
      <span aria-hidden="true">)</span>
    </p>
  );
}

/** Free-form bracketed micro label, e.g. "( Independent technology consulting )". */
export function MicroLabel({
  children,
  dark = false,
  className = "",
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <p className={`mono-label ${dark ? "text-mist" : "text-slate"} ${className}`}>
      <span aria-hidden="true">( </span>
      {children}
      <span aria-hidden="true"> )</span>
    </p>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  /** primary: ink pill on light · secondary: outline on light · on-dark: ice pill on dark · ghost-dark: outline on dark */
  variant?: "primary" | "secondary" | "on-dark" | "ghost-dark";
  icon?: "arrow" | "external";
  className?: string;
};

export function LinkButton({ href, children, variant = "primary", icon = "arrow", className = "" }: LinkButtonProps) {
  const styles = {
    primary: "bg-ink text-paper hover:bg-signal",
    secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-paper",
    "on-dark": "bg-ice text-ink hover:bg-paper",
    "ghost-dark": "border border-ice/35 bg-ink/55 text-paper hover:border-phosphor hover:text-phosphor",
  }[variant];
  const Icon = icon === "arrow" ? ArrowRight : ArrowUpRight;
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 font-mono text-[0.8rem] font-medium uppercase tracking-[0.06em] transition-colors duration-200 ${styles} ${className}`}
    >
      {children}
      <Icon aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Photograph in a rounded frame with a mono caption. */
export function Plate({
  image,
  plate,
  sizes,
  priority = false,
  className = "",
  aspect = "aspect-[4/3]",
  dark = false,
}: {
  image: ImageRef;
  plate?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  dark?: boolean;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div className={`relative overflow-hidden rounded-[var(--radius-card)] bg-paper-2 ${aspect}`}>
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      <figcaption className={`mono-label mt-3 flex justify-between gap-4 ${dark ? "text-mist" : "text-slate"}`}>
        <span>{plate ? `( Pl. ${plate} )` : "( Pl. )"}</span>
        <span className="truncate">{image.caption}</span>
      </figcaption>
    </figure>
  );
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.75rem] uppercase tracking-[0.06em] ${
        dark ? "border-rule-dark text-mist" : "border-rule text-graphite"
      }`}
    >
      {children}
    </span>
  );
}

export function IllustrativeBadge({ long = false }: { long?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 font-mono text-[0.75rem] uppercase tracking-[0.06em] text-phosphor">
      <FlaskConical aria-hidden="true" className="size-3.5" />
      {long ? "Illustrative scenario — not a real client" : "Illustrative scenario"}
    </span>
  );
}

export function Notice({ children, title }: { children: ReactNode; title: string }) {
  return (
    <aside className="card flex gap-3 p-5 text-[0.95rem] text-ink" aria-label={title}>
      <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
      <div>
        <p className="font-medium">{title}</p>
        <div className="mt-1 text-graphite">{children}</div>
      </div>
    </aside>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1.5 font-medium text-signal ${className}`}>
      <span className="link-underline">{children}</span>
      <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/**
 * Rounded card surface. `tone`: paper card on light sections, ink card on dark ones, glass for text over a
 * GradientField. Always `h-full flex flex-col` so cards in a grid row share one height.
 */
export function Card({
  as: Component = "div",
  tone = "paper",
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  tone?: "paper" | "ink" | "glass";
  className?: string;
  children: ReactNode;
} & Record<`data-${string}`, string>) {
  const base = { paper: "card", ink: "card-ink on-dark", glass: "card-glass on-dark" }[tone];
  return (
    <Component className={`${base} relative flex h-full flex-col overflow-hidden p-6 md:p-7 ${className}`} {...rest}>
      {children}
    </Component>
  );
}

/**
 * Section wrapper with the four surface tones. "aurora" is a dark section with a GradientField behind it; pass
 * the field as `background` so the content stays on top.
 */
export function Section({
  tone = "paper",
  background,
  className = "",
  innerClassName = "",
  children,
  ...rest
}: {
  tone?: "paper" | "paper-2" | "ink" | "aurora";
  background?: ReactNode;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
}) {
  const surface = {
    paper: "bg-paper text-ink",
    "paper-2": "bg-paper-2 text-ink",
    ink: "on-dark bg-ink text-paper",
    aurora: "on-dark bg-ink text-paper",
  }[tone];
  return (
    <section className={`relative overflow-hidden ${surface} ${className}`} {...rest}>
      {background}
      <div className={`container-x section-y relative ${innerClassName}`}>{children}</div>
    </section>
  );
}
