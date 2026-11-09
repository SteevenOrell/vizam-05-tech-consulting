import { useId } from "react";

/**
 * GhostNumeral: an oversized outlined (or faintly filled) numeral or short word behind a section or card,
 * e.g. "02". Drawn as SVG text so it scales with its box and never counts as page text: it is decorative
 * (aria-hidden), the real number or label must also appear as normal text nearby.
 *
 * Use `variant="fill"` (default) for words: Geist is a variable font and its overlapping contours show in an
 * outline on letters such as H or L. `outline` is fine for digits.
 *
 * Size it with the className (height or width), e.g. `h-[12rem]` or `w-full`. Default placement is up to the
 * parent (`absolute` + offsets); it is `pointer-events-none` and `select-none`.
 */
export function GhostNumeral({
  value,
  tone = "dark",
  variant = "fill",
  className = "",
}: {
  value: string;
  /** "dark" for dark backgrounds, "light" for paper, "aurora" for a cobalt → ice stroke on dark. */
  tone?: "dark" | "light" | "aurora";
  variant?: "outline" | "fill";
  className?: string;
}) {
  const gid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  // About 0.62 em per glyph at weight 600; textLength then fits the text to the box exactly.
  const width = Math.max(1, value.length) * 64 + 8;
  const outline = variant === "outline";
  const colour = {
    dark: outline ? "rgb(211 241 248 / 0.24)" : "rgb(211 241 248 / 0.07)",
    light: outline ? "rgb(7 11 28 / 0.16)" : "rgb(7 11 28 / 0.06)",
    aurora: `url(#ghost-${gid})`,
  }[tone];
  const k = outline ? 1 : 0.3;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${width} 100`}
      className={`pointer-events-none select-none overflow-visible ${className}`}
    >
      {tone === "aurora" && (
        <defs>
          <linearGradient id={`ghost-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2f4ff0" stopOpacity={0.9 * k} />
            <stop offset="0.6" stopColor="#1fb5d6" stopOpacity={0.7 * k} />
            <stop offset="1" stopColor="#d3f1f8" stopOpacity={0.5 * k} />
          </linearGradient>
        </defs>
      )}
      <text
        x="4"
        y="86"
        style={{ fontFamily: "var(--font-geist), ui-sans-serif, sans-serif" }}
        fontSize="104"
        fontWeight="600"
        letterSpacing="-6"
        textLength={width - 8}
        lengthAdjust="spacingAndGlyphs"
        fill={outline ? "none" : colour}
        stroke={outline ? colour : "none"}
        strokeWidth={outline ? 1.25 : 0}
        vectorEffect="non-scaling-stroke"
      >
        {value}
      </text>
    </svg>
  );
}
