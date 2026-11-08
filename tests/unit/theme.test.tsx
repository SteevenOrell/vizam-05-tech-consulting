import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { GhostNumeral } from "@/components/ui/ghost-numeral";
import { GradientField } from "@/components/ui/gradient-field";
import { extrusionFaces, markHalves, rectsPath } from "@/components/ui/halvaren-mark";
import { SectionIndex } from "@/components/ui/primitives";

describe("GradientField", () => {
  it("is decorative and renders a stable mosaic for a given seed", () => {
    const a = render(<GradientField seed={3} />);
    const b = render(<GradientField seed={3} />);
    const root = a.container.firstElementChild!;
    expect(root.getAttribute("aria-hidden")).toBe("true");
    const cellsA = a.container.querySelectorAll("rect");
    expect(cellsA.length).toBeGreaterThan(10);
    expect(a.container.innerHTML).toBe(b.container.innerHTML);
  });

  it("renders only the soft wash without the mosaic", () => {
    const { container } = render(<GradientField mosaic={false} />);
    expect(container.querySelector("svg")).toBeNull();
  });
});

describe("GhostNumeral", () => {
  it("is hidden from assistive technology", () => {
    const { container } = render(<GhostNumeral value="02" tone="aurora" />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("aria-hidden")).toBe("true");
    expect(svg.textContent).toBe("02");
    // The gradient id is sanitised so url(#…) references resolve.
    expect(container.querySelector("linearGradient")!.id).toMatch(/^ghost-[\w-]+$/);
  });
});

describe("Halvaren mark geometry", () => {
  it("builds closed paths for the halves and their extrusion", () => {
    expect(rectsPath(markHalves.left)).toMatch(/^M96 64h124v412h-124Z/);
    const faces = extrusionFaces(markHalves.right, 46, -34);
    expect(faces.right.match(/Z/g)).toHaveLength(markHalves.right.length);
    expect(faces.top.match(/Z/g)).toHaveLength(markHalves.right.length);
  });
});

describe("SectionIndex", () => {
  it("keeps the number and label readable without the decorative brackets", () => {
    const { container } = render(<SectionIndex n="02" label="Services" />);
    const visible = Array.from(container.querySelectorAll("span:not([aria-hidden])")).map((s) => s.textContent);
    expect(visible).toEqual(["02", "Services"]);
  });
});
