import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { DecisionRecord } from "@/components/ui/decision-record";
import { RolesAccordion } from "@/components/sections/roles-accordion";
import { roles } from "@/lib/content/careers";
import { services } from "@/lib/content/services";
import { jsonLdString } from "@/lib/seo";

vi.mock("motion/react", async () => {
  const actual = await vi.importActual<typeof import("motion/react")>("motion/react");
  return { ...actual, useReducedMotion: () => true };
});

describe("DecisionRecord", () => {
  it("renders context, options, decision and consequences", () => {
    const record = services[0].decision;
    render(<DecisionRecord record={record} />);
    expect(screen.getByRole("heading", { name: record.title })).toBeInTheDocument();
    expect(screen.getByText(record.decision)).toBeInTheDocument();
    for (const o of record.options) expect(screen.getByText(o)).toBeInTheDocument();
    expect(screen.getByText(`Decision record · ${record.id}`)).toBeInTheDocument();
  });
});

describe("RolesAccordion", () => {
  it("labels roles as demo and toggles panels with aria-expanded", () => {
    render(<RolesAccordion roles={roles} />);
    expect(screen.getAllByText("Demo role")).toHaveLength(roles.length);
    const first = screen.getByRole("button", { name: new RegExp(roles[0].title) });
    expect(first).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(first);
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/not open for applications/)).toBeInTheDocument();
  });
});

describe("jsonLdString", () => {
  it("escapes < to prevent script injection", () => {
    expect(jsonLdString({ a: "</script><script>alert(1)</script>" })).not.toContain("<");
  });
});
