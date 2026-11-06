"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    headingRef.current?.focus();
  }, [error]);

  return (
    <section className="relative overflow-hidden border-b border-rule" aria-labelledby="err-title">
      <div className="grid-hairlines pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-x section-y relative">
        <p className="mono-label text-danger">Error · Something went wrong</p>
        <h1 id="err-title" ref={headingRef} tabIndex={-1} className="mt-6 max-w-[18ch] text-display focus:outline-none">
          This page could not be displayed.
        </h1>
        <p className="mt-6 max-w-xl text-[1.15rem] text-graphite">
          An unexpected error occurred. You can try again, or return to the home page.
          {error.digest ? <span className="mt-2 block font-mono text-sm text-slate">Reference: {error.digest}</span> : null}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center rounded-[2px] bg-ink px-5 font-medium text-paper hover:bg-signal"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center rounded-[2px] border border-ink px-5 font-medium hover:bg-ink hover:text-paper">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
