"use client";

import { useRef } from "react";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect } from "./gsap-client";

/**
 * Decorative coordinate grid: 13 vertical hairlines that draw in from the top, with mono tick labels.
 * Purely presentational (aria-hidden).
 */
export function DrawLines({ dark = false, labels = true }: { dark?: boolean; labels?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lines = el.querySelectorAll<HTMLElement>("[data-draw]");
    if (prefersReducedMotion()) {
      lines.forEach((l) => l.classList.add("is-drawn"));
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.4, ease: "power3.inOut", stagger: { each: 0.05, from: "start" } },
      );
      lines.forEach((l) => l.classList.add("is-drawn"));
    }, el);
    return () => ctx.revert();
  }, []);

  const line = dark ? "bg-rule-dark" : "bg-rule/80";
  const text = dark ? "text-mist/70" : "text-slate/70";
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="container-x relative h-full">
        <div className="relative h-full">
          {Array.from({ length: 13 }, (_, i) => (
            <span
              key={i}
              data-draw=""
              className={`absolute top-0 h-full w-px origin-top ${line} ${i % 2 === 1 ? "hidden md:block" : ""}`}
              style={{ left: `${(i / 12) * 100}%` }}
            />
          ))}
          {labels && (
            <div className={`mono-label absolute inset-x-0 bottom-3 hidden justify-between md:flex ${text}`}>
              {["A", "B", "C", "D", "E", "F"].map((l, i) => (
                <span key={l}>
                  {l}/{String(i * 2 + 1).padStart(2, "0")}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
