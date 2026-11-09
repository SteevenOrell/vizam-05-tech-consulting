"use client";
import Image from "next/image";
import { useRef } from "react";
import { getGsap, prefersReducedMotion, useIsoLayoutEffect } from "./gsap-client";

/** Photorealistic decorative Earth; static for reduced motion. */
export function HeroGlyph({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.4, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);
  return <div ref={ref} data-glyph="globe" aria-hidden="true" className={`relative ${className}`}>
    <Image src="/images/hero-earth-realistic.webp" alt="" width={1254} height={1254} unoptimized priority sizes="(min-width: 1024px) 640px, (min-width: 768px) 520px, 100vw" className="h-auto w-full" />
  </div>;
}
