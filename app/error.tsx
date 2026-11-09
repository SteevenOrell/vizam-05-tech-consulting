"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { GradientField } from "@/components/ui/gradient-field";
import { MicroLabel } from "@/components/ui/primitives";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, [error]);

  return (
    <section
      className="on-dark relative -mt-[var(--header-h)] overflow-hidden rounded-b-[var(--radius-panel)] bg-ink text-paper"
      aria-labelledby="err-title"
    >
      <GradientField tone="ink" focus={[0.9, 0.85]} columns={24} seed={500} />
      <div className="container-x section-y relative pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)]">
        <MicroLabel dark className="text-ice">
          Error · Something went wrong
        </MicroLabel>
        <h1 id="err-title" ref={headingRef} tabIndex={-1} className="mt-6 max-w-[18ch] text-display-xl focus:outline-none">
          This page could not be displayed.
        </h1>
        <p className="mt-6 max-w-xl text-[1.15rem] text-paper">
          An unexpected error occurred. You can try again, or return to the home page.
          {error.digest ? <span className="mt-2 block font-mono text-sm text-mist">Reference: {error.digest}</span> : null}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center rounded-full bg-ice px-6 font-mono text-[0.8rem] font-medium uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-full border border-ice/35 bg-ink/55 px-6 font-mono text-[0.8rem] font-medium uppercase tracking-[0.06em] text-paper transition-colors hover:border-phosphor hover:text-phosphor">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
