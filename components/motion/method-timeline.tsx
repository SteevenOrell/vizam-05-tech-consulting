"use client";

import { useRef } from "react";
import { method } from "@/lib/content/site";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect } from "./gsap-client";

/**
 * The four-step method as a scroll-linked timeline: a phosphor progress line grows with scroll and each
 * step activates as it reaches the middle of the viewport. Reduced motion: every step shown active, line full.
 */
export function MethodTimeline() {
  const ref = useRef<HTMLOListElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const steps = el.querySelectorAll<HTMLElement>("[data-step]");
    const bar = el.querySelector<HTMLElement>("[data-progress]");
    if (prefersReducedMotion()) {
      steps.forEach((s) => s.setAttribute("data-active", "true"));
      if (bar) bar.style.transform = "scaleY(1)";
      return;
    }
    const { gsap, ScrollTrigger } = getGsap();
    const ctx = gsap.context(() => {
      if (bar) {
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 60%", scrub: 0.4 } },
        );
      }
      steps.forEach((step) => {
        step.setAttribute("data-active", "false");
        ScrollTrigger.create({
          trigger: step,
          start: "top 62%",
          onEnter: () => step.setAttribute("data-active", "true"),
          onLeaveBack: () => step.setAttribute("data-active", "false"),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden="true" className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px bg-rule-dark" />
      <span
        aria-hidden="true"
        data-progress=""
        className="absolute left-[0.6rem] top-2 h-[calc(100%-1rem)] w-px origin-top bg-phosphor"
        style={{ transform: "scaleY(1)" }}
      />
      {method.map((m) => (
        <li
          key={m.step}
          data-step=""
          data-active="true"
          className="group relative grid gap-3 pb-14 pl-12 last:pb-0 md:grid-cols-[8rem_1fr] md:gap-8"
        >
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 size-[1.25rem] rounded-full border border-rule-dark bg-ink transition-colors duration-500 group-data-[active=true]:border-phosphor group-data-[active=true]:bg-phosphor"
          />
          <p className="mono-label pt-1 text-mist transition-colors duration-500 group-data-[active=true]:text-phosphor">
            Step {m.step}
          </p>
          <div>
            <h3 className="text-[1.9rem] leading-none tracking-[-0.03em] md:text-[2.4rem]">{m.title}</h3>
            <p className="mt-3 max-w-xl text-mist">{m.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
