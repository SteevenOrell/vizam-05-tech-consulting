/** Halvaren wordmark: a split square (two halves meeting at a hairline) followed by the name. */
export function Logo({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const color = tone === "ink" ? "text-ink" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color} ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
        <rect x="0.5" y="0.5" width="21" height="21" fill="none" stroke="currentColor" />
        <rect x="0.5" y="0.5" width="10" height="21" fill="currentColor" />
        <rect x="12.5" y="11" width="9" height="10.5" className={tone === "ink" ? "fill-signal" : "fill-phosphor"} />
      </svg>
      <span className="text-[1.06rem] font-medium tracking-[-0.02em]">Halvaren</span>
    </span>
  );
}
