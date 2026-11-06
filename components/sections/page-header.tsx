import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbJsonLd, jsonLdString } from "@/lib/seo";
import { RevealText } from "@/components/motion/reveal-text";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol className="mono-label flex flex-wrap items-center gap-x-2 gap-y-1 text-slate">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="link-underline hover:text-ink">
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

export function PageHeader({
  crumbs,
  index,
  title,
  lead,
  children,
  aside,
}: {
  crumbs: Crumb[];
  index: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="relative border-b border-rule">
      <div className="grid-hairlines pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative pb-14 pt-10 md:pb-20 md:pt-14">
        <Breadcrumbs items={crumbs} />
        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mono-label mb-5 text-signal">{index}</p>
            <RevealText as="h1" className="text-display">
              {title}
            </RevealText>
            {lead && <p className="mt-6 max-w-2xl text-[1.15rem] text-graphite md:text-[1.25rem]">{lead}</p>}
            {children}
          </div>
          {aside && <div className="lg:col-span-4">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
