import { ImageResponse } from "next/og";
import { site } from "@/lib/content/site";

export const alt = `${site.name} — ${site.tagline} (VIZAM concept project, fictional company)`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const lines = Array.from({ length: 13 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f2f1ec", color: "#0c1014", padding: 72, position: "relative" }}>
        {lines.map((i) => (
          <div key={i} style={{ position: "absolute", top: 0, bottom: 0, left: 72 + (i * (1200 - 144)) / 12, width: 1, background: "#cfccc2" }} />
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 40, height: 40, border: "2px solid #0c1014" }}>
            <div style={{ width: 18, height: "100%", background: "#0c1014" }} />
            <div style={{ display: "flex", flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}>
              <div style={{ width: 16, height: 18, background: "#0a6b58" }} />
            </div>
          </div>
          <div style={{ fontSize: 34, letterSpacing: -1 }}>Halvaren</div>
        </div>
        <div style={{ display: "flex", marginTop: "auto", fontSize: 92, lineHeight: 1, letterSpacing: -4, maxWidth: 900 }}>{site.tagline}</div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 20, letterSpacing: 2, textTransform: "uppercase", color: "#0a6b58" }}>
          VIZAM concept project — fictional company
        </div>
      </div>
    ),
    size,
  );
}
