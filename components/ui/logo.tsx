import { MARK_VIEWBOX, markHalves, rectsPath } from "./halvaren-mark";

/** Halvaren wordmark: the split-H monogram (two halves meeting at a hairline) followed by the name. */
export function Logo({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const color = tone === "ink" ? "text-ink" : "text-paper";
  return (
    <span className={`inline-flex items-center gap-2.5 ${color} ${className}`}>
      <svg
        width="24"
        height="24"
        viewBox={`60 40 ${MARK_VIEWBOX - 120} ${MARK_VIEWBOX - 60}`}
        aria-hidden="true"
        focusable="false"
      >
        <path d={rectsPath(markHalves.left)} fill="currentColor" />
        <path d={rectsPath(markHalves.right)} className={tone === "ink" ? "fill-signal" : "fill-phosphor"} />
      </svg>
      <span className="text-[1.08rem] font-semibold tracking-[-0.03em]">Halvaren</span>
    </span>
  );
}
