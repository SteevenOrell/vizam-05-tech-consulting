"use client";

import { useRef } from "react";
import { MARK_VIEWBOX, extrusionFaces, markHalves, rectsPath } from "@/components/ui/halvaren-mark";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect } from "./gsap-client";

const DX = 46;
const DY = -34;

function Half({ side }: { side: "left" | "right" }) {
  const rects = markHalves[side];
  const faces = extrusionFaces(rects, DX, DY);
  const front = rectsPath(rects);
  return (
    <g data-half={side}>
      {/* Painter's order for an up-right extrusion: right faces, then top faces, then the front. */}
      <path d={faces.right} fill="url(#hg-side)" />
      <path d={faces.top} fill="url(#hg-top)" />
      <path d={front} fill="url(#hg-front)" />
      <path d={front} fill="url(#hg-brush)" opacity="0.55" />
      <path d={front} fill="none" stroke="url(#hg-rim)" strokeWidth="1.5" />
    </g>
  );
}

/**
 * The Home hero visual: the Halvaren split-H monogram as an extruded, brushed-metal object in the aurora palette.
 * Code only (inline SVG + GSAP). Decorative: aria-hidden, the hero heading carries the meaning.
 * Motion: the two halves slide together once and a light sheen crosses the faces; a gentle scroll-linked drift
 * follows. Under prefers-reduced-motion it renders the assembled, static object.
 */
export function HeroGlyph({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add("is-assembled");
      return;
    }
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo('[data-half="left"]', { x: -70, y: 40, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.3 }, 0.1)
        .fromTo('[data-half="right"]', { x: 70, y: -40, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.3 }, 0.1)
        .fromTo("[data-sheen]", { x: -200 }, { x: 1000, duration: 1.6, ease: "power2.inOut" }, 0.9);
      el.classList.add("is-assembled");

      gsap.to("[data-drift]", {
        yPercent: -8,
        rotate: -2.5,
        transformOrigin: "50% 50%",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const v = MARK_VIEWBOX;
  return (
    <svg
      ref={ref}
      data-glyph=""
      viewBox={`40 0 ${v - 20} ${v}`}
      aria-hidden="true"
      focusable="false"
      className={`overflow-visible ${className}`}
    >
      <defs>
        <linearGradient id="hg-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1a2560" />
          <stop offset="0.32" stopColor="#0c1440" />
          <stop offset="0.55" stopColor="#2340d6" />
          <stop offset="0.7" stopColor="#1fb5d6" />
          <stop offset="0.82" stopColor="#0f1a4c" />
          <stop offset="1" stopColor="#070b1c" />
        </linearGradient>
        <linearGradient id="hg-top" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#7fe3f0" />
          <stop offset="0.5" stopColor="#d3f1f8" />
          <stop offset="1" stopColor="#3a6cf5" />
        </linearGradient>
        <linearGradient id="hg-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2f4ff0" />
          <stop offset="0.6" stopColor="#14206a" />
          <stop offset="1" stopColor="#070b1c" />
        </linearGradient>
        <linearGradient id="hg-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d3f1f8" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#d3f1f8" stopOpacity="0.15" />
          <stop offset="1" stopColor="#7fe3f0" stopOpacity="0.6" />
        </linearGradient>
        {/* Brushed metal: fine horizontal hairlines of varying weight. */}
        <pattern id="hg-brush" width="600" height="9" patternUnits="userSpaceOnUse">
          <rect y="0" width="600" height="0.8" fill="#d3f1f8" opacity="0.16" />
          <rect y="2.6" width="600" height="0.5" fill="#ffffff" opacity="0.08" />
          <rect y="4.4" width="600" height="1.2" fill="#070b1c" opacity="0.22" />
          <rect y="7.1" width="600" height="0.6" fill="#7fe3f0" opacity="0.1" />
        </pattern>
        <linearGradient id="hg-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="hg-clip">
          <path d={rectsPath([...markHalves.left, ...markHalves.right])} />
        </clipPath>
        <radialGradient id="hg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1fb5d6" stopOpacity="0.45" />
          <stop offset="1" stopColor="#1fb5d6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g data-drift="">
        <ellipse cx="320" cy="330" rx="300" ry="250" fill="url(#hg-glow)" />
        <Half side="left" />
        <Half side="right" />
        <g clipPath="url(#hg-clip)">
          <g data-sheen="">
            <rect x="-200" y="0" width="200" height="600" fill="url(#hg-sheen)" transform="skewX(-18)" />
          </g>
        </g>
      </g>
    </svg>
  );
}
