"use client";

/** Last-resort error boundary for failures in the root layout. Inline styles: globals.css may not have loaded. */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en-GB">
      <body style={{ margin: 0, background: "#f2f1ec", color: "#0c1014", fontFamily: "system-ui, sans-serif" }}>
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "15vh 1.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Halvaren · Error
          </p>
          <h1 style={{ fontSize: 40, fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            The site could not be displayed.
          </h1>
          <p>Please try again in a moment.</p>
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 16, padding: "12px 20px", background: "#0c1014", color: "#f2f1ec", border: 0, borderRadius: 2, cursor: "pointer" }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
