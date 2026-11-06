import { expect, test, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { mainRoutes } from "./routes";

const SHOTS = "test-results/screens";
mkdirSync(SHOTS, { recursive: true });

async function settle(page: Page) {
  await page.waitForLoadState("networkidle");
  // Scroll through once so lazy images and scroll-linked animations reach their resting state.
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < h; y += 700) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
}

async function overflow(page: Page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

test.describe("no horizontal scroll from 300 px up", () => {
  for (const width of [300, 390, 768, 1024, 1440]) {
    test(`all routes at ${width}px`, async ({ page }) => {
      test.setTimeout(180_000);
      await page.setViewportSize({ width, height: 900 });
      const failures: string[] = [];
      for (const route of mainRoutes) {
        await page.goto(route);
        await page.waitForLoadState("networkidle");
        const o = await overflow(page);
        if (o > 0) failures.push(`${route}: ${o}px`);
      }
      expect(failures).toEqual([]);
    });
  }
});

test.describe("equal-size cards", () => {
  for (const [route, width] of [
    ["/", 1440],
    ["/industries", 1440],
    ["/industries", 768],
    ["/case-studies", 1440],
    ["/case-studies", 768],
    ["/insights", 1440],
    ["/services", 1440],
    ["/about", 1440],
  ] as const) {
    test(`${route} @ ${width}px: cards in each row share one height`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await settle(page);
      const rows = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-card]"));
        const byRow = new Map<string, number[]>();
        for (const c of cards) {
          const r = c.getBoundingClientRect();
          const key = `${c.parentElement?.parentElement?.tagName}-${Math.round(r.top + window.scrollY)}`;
          byRow.set(key, [...(byRow.get(key) ?? []), Math.round(r.height)]);
        }
        return Array.from(byRow.values()).filter((h) => h.length > 1);
      });
      expect(rows.length).toBeGreaterThan(0);
      for (const heights of rows) expect(Math.max(...heights) - Math.min(...heights)).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("below 250 px the layout locks at 500 px", () => {
  test("#root and fixed menu are 500 px wide and the page pans", async ({ page }) => {
    await page.setViewportSize({ width: 240, height: 800 });
    await page.goto("/");
    const rootWidth = await page.locator("#root").evaluate((el) => el.getBoundingClientRect().width);
    expect(rootWidth).toBe(500);
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflowX)).toBe("auto");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeGreaterThanOrEqual(500);
    await page.getByRole("button", { name: "Open menu" }).click();
    const menu = page.locator("#mobile-menu");
    await expect(menu).toBeVisible();
    const box = await menu.evaluate((el) => ({ w: el.getBoundingClientRect().width, right: getComputedStyle(el).right }));
    expect(box.w).toBe(500);
    expect(box.right).toBe("auto");
    await page.screenshot({ path: `${SHOTS}/lock-240-menu.png` });
  });
});

test.describe("screenshots", () => {
  const pages = ["/", "/services/data-ai", "/case-studies", "/insights", "/consultation"];
  for (const width of [240, 390, 768, 1440]) {
    test(`capture @ ${width}px`, async ({ page }) => {
      test.setTimeout(180_000);
      await page.setViewportSize({ width, height: width < 768 ? 844 : 900 });
      for (const route of pages) {
        await page.goto(route);
        await settle(page);
        const name = route === "/" ? "home" : route.slice(1).replace(/\//g, "-");
        await page.screenshot({ path: `${SHOTS}/${name}-${width}.png`, fullPage: true });
      }
      if (width < 1024) {
        await page.goto("/");
        await page.getByRole("button", { name: "Open menu" }).click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await page.waitForTimeout(400);
        await page.screenshot({ path: `${SHOTS}/menu-${width}.png` });
      }
    });
  }
});
