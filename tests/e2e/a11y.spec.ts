import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mainRoutes } from "./routes";

// Scanned with reduced motion so the scan measures final (resting) states, not mid-animation frames.
test.use({ reducedMotion: "reduce" });

const tags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

for (const width of [390, 1440]) {
  test.describe(`axe @ ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    for (const route of [...mainRoutes, "/missing-page"]) {
      test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState("networkidle");
        const results = await new AxeBuilder({ page }).withTags(tags).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} node(s) — ${v.nodes[0]?.target.join(" ")}`);
        expect(summary).toEqual([]);
      });
    }
  });
}

test("open mobile menu and form error states have no violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send demo enquiry/ }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  let results = await new AxeBuilder({ page }).withTags(tags).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  results = await new AxeBuilder({ page }).withTags(tags).include("#mobile-menu").analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
