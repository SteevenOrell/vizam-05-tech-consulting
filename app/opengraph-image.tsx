import { ImageResponse } from "next/og";
import { MARK_VIEWBOX, markHalves, rectsPath } from "@/components/ui/halvaren-mark";
import { site } from "@/lib/content/site";

export const alt = `${site.name} — ${site.tagline} (VIZAM concept project, fictional company)`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Pixel mosaic cells around the bright core (static, no randomness: the image is rendered once). */
const COLS = 20;
const ROWS = 11;
const CELL = 60;
const cells: { x: number; y: number; fill: string; o: number }[] = [];
for (let y = 0; y < ROWS; y++) {
  for (let x = 0; x < COLS; x++) {
    const d = Math.hypot((x + 0.5) / COLS - 0.86, ((y + 0.5) / ROWS - 0.62) * 0.55);
    const presence = 1 - d / 0.5;
    if (presence <= 0 || (x * 7 + y * 13 + x * y) % 5 === 0) continue;
    const t = 1 - d * 1.4;
    const fill = t > 0.62 ? "#D3F1F8" : t > 0.38 ? "#1FB5D6" : "#2340E8";
    cells.push({ x, y, fill, o: Math.round(Math.min(0.55, presence * 0.6) * 100) / 100 });
  }
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: 72,
          color: "#F4F1EA",
          backgroundColor: "#070B1C",
          backgroundImage:
            "radial-gradient(circle at 86% 62%, rgba(211,241,248,0.55), rgba(31,181,214,0.65) 22%, rgba(35,64,232,0.8) 48%, rgba(7,11,28,0) 78%), linear-gradient(160deg, #070B1C 0%, #0A1236 60%, #101C5C 100%)",
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox={`0 0 ${COLS * CELL} ${ROWS * CELL}`}
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {cells.map((c) => (
            <rect key={`${c.x}-${c.y}`} x={c.x * CELL} y={c.y * CELL} width={CELL} height={CELL} fill={c.fill} opacity={c.o} />
          ))}
        </svg>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox={`60 40 ${MARK_VIEWBOX - 120} ${MARK_VIEWBOX - 60}`}>
            <path d={rectsPath(markHalves.left)} fill="#F4F1EA" />
            <path d={rectsPath(markHalves.right)} fill="#7FE3F0" />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -1 }}>Halvaren</div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 96,
            lineHeight: 0.95,
            fontWeight: 600,
            letterSpacing: -4,
            textTransform: "uppercase",
            maxWidth: 720,
          }}
        >
          {site.tagline}
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 22, letterSpacing: 2, textTransform: "uppercase", color: "#D3F1F8" }}>
          ( VIZAM concept project — fictional company )
        </div>
      </div>
    ),
    size,
  );
}
