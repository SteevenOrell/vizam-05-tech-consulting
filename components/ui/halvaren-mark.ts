/**
 * Geometry of the Halvaren monogram: an "H" split into two halves that meet at a hairline gap,
 * the left half set slightly higher than the right ("two halves, one decision").
 * Used by the flat brand Logo. Units: a 600 × 600 view box.
 */
export type Rect = { x: number; y: number; w: number; h: number };

export const MARK_VIEWBOX = 600;

export const markHalves: { left: Rect[]; right: Rect[] } = {
  left: [
    { x: 96, y: 64, w: 124, h: 412 },
    { x: 220, y: 244, w: 70, h: 104 },
  ],
  right: [
    { x: 310, y: 252, w: 70, h: 104 },
    { x: 380, y: 124, w: 124, h: 412 },
  ],
};

/** SVG path for a list of rectangles. */
export function rectsPath(rects: Rect[]) {
  return rects.map((r) => `M${r.x} ${r.y}h${r.w}v${r.h}h${-r.w}Z`).join("");
}

/** Side faces of an orthogonal extrusion towards (dx, dy) with dy < 0 (up and to the right). */
export function extrusionFaces(rects: Rect[], dx: number, dy: number) {
  const right = rects.map(
    (r) => `M${r.x + r.w} ${r.y}L${r.x + r.w + dx} ${r.y + dy}L${r.x + r.w + dx} ${r.y + r.h + dy}L${r.x + r.w} ${r.y + r.h}Z`,
  );
  const top = rects.map((r) => `M${r.x} ${r.y}L${r.x + dx} ${r.y + dy}L${r.x + r.w + dx} ${r.y + dy}L${r.x + r.w} ${r.y}Z`);
  return { right: right.join(""), top: top.join("") };
}
