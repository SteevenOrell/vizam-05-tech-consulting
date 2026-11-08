"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { GradientField } from "@/components/ui/gradient-field";
import { Logo } from "@/components/ui/logo";
import { mainNav, site } from "@/lib/content/site";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  // Close the menu when the route changes (render-time state adjustment, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      // The close (toggle) button sits in the header, outside the panel: keep it in the cycle so keyboard
      // users can always reach a visible way out, not only Escape.
      const focusables = [
        ...(toggleRef.current ? [toggleRef.current] : []),
        ...Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")),
      ];
      if (!focusables.length) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (!focusables.includes(document.activeElement as HTMLElement)) {
        e.preventDefault();
        (e.shiftKey ? lastEl : firstEl).focus();
      } else if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // Close the mobile menu if the viewport grows past the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-2 pb-2 pt-3 sm:px-4">
      <div
        className={`on-dark relative z-[60] mx-auto flex h-14 max-w-[85rem] items-center justify-between gap-4 rounded-full border bg-ink-2/95 pl-5 pr-1.5 text-paper backdrop-blur-md transition-shadow duration-300 ${
          scrolled || open ? "border-rule-dark shadow-[0_10px_30px_-12px_rgb(7_11_28/0.55)]" : "border-ice/10"
        }`}
      >
        <Link href="/" className="shrink-0 rounded-full" aria-label={`${site.name} — home`}>
          <Logo tone="paper" />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`inline-flex rounded-full px-3 py-2 font-mono text-[0.74rem] uppercase tracking-[0.07em] transition-colors ${
                      active ? "bg-ice/12 text-paper" : "text-mist hover:text-paper"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/contact"
            className={`hidden rounded-full border px-4 py-2.5 font-mono text-[0.74rem] uppercase tracking-[0.07em] transition-colors lg:inline-flex ${
              isActive(pathname, "/contact") ? "border-ice/40 text-paper" : "border-ice/15 text-mist hover:border-ice/40 hover:text-paper"
            }`}
            aria-current={isActive(pathname, "/contact") ? "page" : undefined}
          >
            Contact
          </Link>
          <Link
            href="/consultation"
            className="group hidden items-center gap-1.5 rounded-full bg-ice px-4 py-2.5 font-mono text-[0.74rem] font-medium uppercase tracking-[0.07em] text-ink transition-colors hover:bg-paper sm:inline-flex"
          >
            Request a consultation
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ice/20 text-paper transition-colors hover:border-ice/50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? close() : setOpen(true))}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="on-dark fixed-lock fixed inset-0 z-50 overflow-y-auto bg-ink pt-[var(--header-h)] text-paper lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <GradientField tone="ink" focus={[0.9, 0.95]} columns={14} aspect={0.6} seed={11} />
            <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col py-8">
              <p className="mono-label mb-6 text-mist">( Index )</p>
              <ul className="border-t border-rule-dark">
                {[...mainNav, { href: "/contact", label: "Contact" }].map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-rule-dark">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => close(false)}
                        className="flex items-baseline gap-4 py-4 text-[1.75rem] font-semibold tracking-[-0.035em] hover:text-phosphor"
                      >
                        <span className="mono-label w-8 font-normal text-mist">{String(i + 1).padStart(2, "0")}</span>
                        <span className={active ? "text-phosphor" : undefined}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/consultation"
                onClick={() => close(false)}
                className="mt-8 inline-flex items-center justify-between gap-2 rounded-full bg-ice px-6 py-4 font-mono text-[0.85rem] font-medium uppercase tracking-[0.06em] text-ink"
              >
                Request a consultation
                <ArrowUpRight aria-hidden="true" className="size-5" />
              </Link>
              <p className="mono-label mt-auto pt-10 text-mist">{site.conceptNotice}</p>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
