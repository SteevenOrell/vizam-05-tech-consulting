"use client";

import { useRef } from "react";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect } from "./gsap-client";

/**
 * Scroll-linked statement: words move from muted to full ink as the paragraph crosses the viewport.
 * Without JS or with reduced motion, text renders in full ink (the end state).
 */
export function HighlightText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-hw]"),
        { opacity: 0.38 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} data-hw="">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
