"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
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
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!focusables.length) return;
      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
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
    <header
      className={`sticky top-0 z-40 border-b bg-paper transition-colors duration-300 ${
        scrolled ? "border-rule" : "border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-underline py-1 text-[0.94rem] ${active ? "text-ink" : "text-graphite hover:text-ink"}`}
                    style={active ? { backgroundSize: "100% 1px" } : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden px-3 py-2 text-[0.94rem] text-graphite hover:text-ink lg:inline-block"
            aria-current={isActive(pathname, "/contact") ? "page" : undefined}
          >
            Contact
          </Link>
          <Link
            href="/consultation"
            className="group hidden items-center gap-1.5 rounded-[2px] bg-ink px-4 py-2.5 text-[0.9rem] font-medium text-paper transition-colors hover:bg-signal sm:inline-flex"
          >
            Request a consultation
            <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[2px] border border-rule text-ink lg:hidden"
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
            className="on-dark fixed-lock fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-ink text-paper lg:hidden"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid-hairlines-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <nav aria-label="Mobile" className="container-x relative flex min-h-full flex-col py-8">
              <p className="mono-label mb-6 text-mist">Index</p>
              <ul className="border-t border-rule-dark">
                {[...mainNav, { href: "/contact", label: "Contact" }].map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-rule-dark">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => close(false)}
                        className="flex items-baseline gap-4 py-4 text-[1.6rem] tracking-[-0.02em] hover:text-phosphor"
                      >
                        <span className="mono-label w-8 text-mist">{String(i + 1).padStart(2, "0")}</span>
                        <span className={active ? "text-phosphor" : undefined}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/consultation"
                onClick={() => close(false)}
                className="mt-8 inline-flex items-center justify-between gap-2 rounded-[2px] bg-phosphor px-5 py-4 font-medium text-ink"
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
