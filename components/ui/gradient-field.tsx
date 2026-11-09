import type { CSSProperties } from "react";

/**
 * GradientField: the Aurora Ledger background system. A soft "blurred" wash made only of radial and linear
 * gradients (no CSS filter blur, so it costs nothing on scroll) plus an optional pixel-mosaic layer: a coarse grid
 * of square cells rendered once as a server-side SVG with crisp edges, sampled from the same aurora ramp.
 *
 * Purely decorative (aria-hidden). Place it as the first child of a `relative overflow-hidden` element and put
 * text on solid areas or on a `.card-glass` panel, never directly on the bright part of the field.
 */

type Tone = "aurora" | "ink" | "ice";

type Props = {
  tone?: Tone;
  /** Where the bright core of the field sits, as fractions of width and height. */
  focus?: [number, number];
  /** Pixel-mosaic layer. `false` renders the soft wash only. */
  mosaic?: boolean;
  /** Mosaic columns; rows follow from `aspect` so cells stay square. */
  columns?: number;
  /** Width / height of the area, used to size the mosaic grid. */
  aspect?: number;
  /** Seed so each field has its own (stable, hydration-safe) cell pattern. */
  seed?: number;
  className?: string;
};

// Aurora ramp: midnight → cobalt → electric teal → pale ice.
const RAMP: [number, [number, number, number]][] = [
  [0, [10, 18, 54]],
  [0.38, [35, 64, 232]],
  [0.72, [31, 181, 214]],
  [1, [211, 241, 248]],
];

function sample(t: number) {
  const v = Math.min(1, Math.max(0, t));
  for (let i = 1; i < RAMP.length; i++) {
    const [p1, c1] = RAMP[i];
    const [p0, c0] = RAMP[i - 1];
    if (v <= p1) {
      const k = (v - p0) / (p1 - p0);
      const c = c0.map((x, j) => Math.round(x + (c1[j] - x) * k));
      return `rgb(${c[0]} ${c[1]} ${c[2]})`;
    }
  }
  return "rgb(211 241 248)";
}

function prng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WASH: Record<Tone, (fx: string, fy: string) => string> = {
  aurora: (fx, fy) =>
    [
      `radial-gradient(60% 70% at ${fx} ${fy}, rgb(211 241 248 / 0.55), transparent 60%)`,
      `radial-gradient(75% 85% at ${fx} ${fy}, rgb(31 181 214 / 0.7), transparent 70%)`,
      `radial-gradient(110% 120% at ${fx} ${fy}, rgb(35 64 232 / 0.85), transparent 75%)`,
      "linear-gradient(160deg, #070b1c 0%, #0a1236 55%, #101c5c 100%)",
    ].join(", "),
  ink: (fx, fy) =>
    [
      `radial-gradient(60% 70% at ${fx} ${fy}, rgb(31 181 214 / 0.28), transparent 70%)`,
      `radial-gradient(100% 110% at ${fx} ${fy}, rgb(35 64 232 / 0.45), transparent 75%)`,
      "linear-gradient(180deg, #070b1c, #0b1129)",
    ].join(", "),
  ice: (fx, fy) =>
    [
      `radial-gradient(55% 65% at ${fx} ${fy}, rgb(31 181 214 / 0.32), transparent 70%)`,
      `radial-gradient(90% 100% at ${fx} ${fy}, rgb(47 79 240 / 0.18), transparent 75%)`,
      "linear-gradient(180deg, #f4f1ea, #eef1f1)",
    ].join(", "),
};

export function GradientField({
  tone = "aurora",
  focus = [0.82, 0.78],
  mosaic = true,
  columns = 24,
  aspect = 16 / 9,
  seed = 7,
  className = "",
}: Props) {
  const [fx, fy] = focus;
  const style: CSSProperties = { backgroundImage: WASH[tone](`${fx * 100}%`, `${fy * 100}%`) };

  const cells: { x: number; y: number; fill: string; o: number }[] = [];
  const rows = Math.max(4, Math.round(columns / aspect));
  if (mosaic) {
    const rand = prng(seed);
    // Ink and ice fields stay quiet so text placed near them keeps its contrast.
    const maxOpacity = { aurora: 0.5, ink: 0.3, ice: 0.22 }[tone];
    const maxT = tone === "aurora" ? 1 : 0.7;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const dx = (x + 0.5) / columns - fx;
        const dy = ((y + 0.5) / rows - fy) / aspect;
        const d = Math.hypot(dx, dy * 1.6);
        // Cells only appear in a band around the bright core, thinning out with distance.
        const presence = 1 - d / 0.55;
        const r = rand();
        if (presence <= 0 || r > presence * 0.9 + 0.08) continue;
        const t = 1 - d * 1.35 + (rand() - 0.5) * 0.22;
        const o = Math.min(maxOpacity, presence * maxOpacity * (0.45 + rand() * 0.75));
        if (o < 0.04) continue;
        cells.push({ x, y, fill: sample(Math.min(maxT, t)), o: Math.round(o * 100) / 100 });
      }
    }
  }

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="gf-wash" style={style} />
      {mosaic && (
        <svg
          className="gf-mosaic"
          viewBox={`0 0 ${columns} ${rows}`}
          preserveAspectRatio="xMidYMid slice"
          shapeRendering="crispEdges"
          focusable="false"
        >
          {cells.map((c) => (
            <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width="1" height="1" fill={c.fill} opacity={c.o} />
          ))}
        </svg>
      )}
    </div>
  );
}
