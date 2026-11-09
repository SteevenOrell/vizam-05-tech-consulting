import Link from "next/link";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { Logo } from "@/components/ui/logo";
import { industries } from "@/lib/content/industries";
import { services } from "@/lib/content/services";
import { site } from "@/lib/content/site";

const company = [
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights", label: "Insights" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy & demo notice" },
];

export function SiteFooter() {
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-paper">
      <GradientField tone="ink" focus={[0.92, 1]} columns={32} aspect={2.6} seed={23} />
      <div className="container-x relative pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="paper" />
            <p className="mt-6 max-w-sm text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.035em]">{site.tagline}</p>
            <p className="mt-6 max-w-sm text-sm text-mist">
              Independent technology and business consulting for regulated and asset-heavy organisations.
            </p>
          </div>
          <nav aria-label="Services" className="lg:col-span-3">
            <h2 className="mono-label mb-4 text-mist">
              <span aria-hidden="true">( </span>Services<span aria-hidden="true"> )</span>
            </h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link className="link-underline hover:text-phosphor" href={`/services/${s.slug}`}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Industries" className="lg:col-span-3">
            <h2 className="mono-label mb-4 text-mist">
              <span aria-hidden="true">( </span>Industries<span aria-hidden="true"> )</span>
            </h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {industries.map((i) => (
                <li key={i.slug}>
                  <Link className="link-underline hover:text-phosphor" href={`/industries/${i.slug}`}>
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company" className="lg:col-span-2">
            <h2 className="mono-label mb-4 text-mist">
              <span aria-hidden="true">( </span>Company<span aria-hidden="true"> )</span>
            </h2>
            <ul className="space-y-2.5 text-[0.95rem]">
              {company.map((c) => (
                <li key={c.href}>
                  <Link className="link-underline hover:text-phosphor" href={c.href}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <GhostNumeral
          value="HALVAREN"
          tone="aurora"
          className="mt-16 block h-auto w-full max-w-full"
        />

        <div className="mt-6 grid gap-4 border-t border-rule-dark pt-6 text-sm text-mist md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-medium text-paper">
              <span className="mr-2 inline-block rounded-full bg-ice px-2 py-0.5 font-mono text-[0.75rem] uppercase tracking-[0.08em] text-ink">
                Concept
              </span>
              {site.conceptNotice}
            </p>
            <p className="mt-2 max-w-3xl">
              {site.conceptLong} Designed and built by VIZAM. Photography from Unsplash, credited in the project
              repository.
            </p>
          </div>
          <p className="font-mono text-xs">© {new Date().getFullYear()} VIZAM · Halvaren is fictional</p>
        </div>
      </div>
    </footer>
  );
}
