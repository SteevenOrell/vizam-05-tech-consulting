"use client";

import { Fragment, useRef } from "react";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect } from "./gsap-client";

type Tag = "h1" | "h2" | "p";

/**
 * Word-by-word reveal for display headings.
 * The hidden start state comes from CSS only when <html> has the `js` class and motion is allowed
 * (see globals.css), with a CSS fallback that reveals the text after 2.5 s if scripts fail.
 */
export function RevealText({
  as: Component = "h2",
  children,
  className = "",
  delay = 0,
}: {
  as?: Tag;
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-revealed");
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll("[data-word]"),
        { yPercent: 105, y: 0 },
        { yPercent: 0, duration: 0.9, ease: "power3.out", stagger: 0.045, delay },
      );
      el.classList.add("is-revealed");
    }, el);
    return () => ctx.revert();
  }, [delay]);

  const words = children.split(" ");
  return (
    <Component ref={ref} data-reveal="" className={className}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <span data-word="" className="inline-block">
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Component>
  );
}
