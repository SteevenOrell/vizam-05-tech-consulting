import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, FlaskConical, Info } from "lucide-react";
import type { ReactNode } from "react";
import type { ImageRef } from "@/lib/content/types";

export function SectionIndex({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p className={`mono-label flex items-center gap-3 ${dark ? "text-mist" : "text-slate"}`}>
      <span className={dark ? "text-phosphor" : "text-signal"}>§ {n}</span>
      <span aria-hidden="true" className={`h-px w-8 ${dark ? "bg-rule-dark" : "bg-rule"}`} />
      <span>{label}</span>
    </p>
  );
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "on-dark" | "ghost-dark";
  icon?: "arrow" | "external";
  className?: string;
};

export function LinkButton({ href, children, variant = "primary", icon = "arrow", className = "" }: LinkButtonProps) {
  const styles = {
    primary: "bg-ink text-paper hover:bg-signal",
    secondary: "border border-ink text-ink hover:bg-ink hover:text-paper",
    "on-dark": "bg-phosphor text-ink hover:bg-paper",
    "ghost-dark": "border border-rule-dark text-paper hover:border-phosphor hover:text-phosphor",
  }[variant];
  const Icon = icon === "arrow" ? ArrowRight : ArrowUpRight;
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] px-5 py-3 text-[0.95rem] font-medium transition-colors duration-200 ${styles} ${className}`}
    >
      {children}
      <Icon aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </Link>
  );
}

/** Photograph framed as a "plate": registration marks at the corners and a mono caption. */
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
  const mark = dark ? "text-mist" : "text-slate";
  return (
    <figure className={`relative ${className}`}>
      <div className={`relative overflow-hidden bg-paper-2 ${aspect}`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
      {(["-left-1.5 -top-1.5", "-right-1.5 -top-1.5", "-left-1.5 -bottom-1.5", "-right-1.5 -bottom-1.5"] as const).map((pos) => (
        <span key={pos} aria-hidden="true" className={`pointer-events-none absolute ${pos} ${mark} font-mono text-xs leading-none`}>
          +
        </span>
      ))}
      <figcaption className={`mono-label mt-3 flex justify-between gap-4 ${dark ? "text-mist" : "text-slate"}`}>
        <span>{plate ? `Pl. ${plate}` : "Pl."}</span>
        <span className="truncate">{image.caption}</span>
      </figcaption>
    </figure>
  );
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center border px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] ${
        dark ? "border-rule-dark text-mist" : "border-rule text-graphite"
      }`}
    >
      {children}
    </span>
  );
}

export function IllustrativeBadge({ long = false }: { long?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-ink px-2 py-1 font-mono text-[0.7rem] uppercase tracking-[0.06em] text-phosphor">
      <FlaskConical aria-hidden="true" className="size-3.5" />
      {long ? "Illustrative scenario — not a real client" : "Illustrative scenario"}
    </span>
  );
}

export function Notice({ children, title }: { children: ReactNode; title: string }) {
  return (
    <aside className="flex gap-3 border border-ink bg-paper-2 p-4 text-[0.95rem]" aria-label={title}>
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
