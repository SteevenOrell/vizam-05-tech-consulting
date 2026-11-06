import { expect, test } from "@playwright/test";
import { mainRoutes } from "./routes";

test.describe("routes", () => {
  for (const route of mainRoutes) {
    test(`${route} renders with one h1, metadata and the concept notice`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("footer")).toContainText("VIZAM concept project — fictional company");
      expect(await page.title()).toContain("Halvaren");
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute("content", /^https?:\/\//);
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      expect(errors).toEqual([]);
    });
  }

  test("unknown routes return the 404 page", async ({ page }) => {
    const res = await page.goto("/this-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("This page is not in the index.");
    const res2 = await page.goto("/services/not-a-service");
    expect(res2?.status()).toBe(404);
  });

  test("desktop navigation reaches every section and marks the current page", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    for (const label of ["Services", "Industries", "Case studies", "Insights", "About", "Careers"]) {
      await nav.getByRole("link", { name: label }).click();
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute("aria-current", "page");
    }
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/about");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Skip to content" });
    await expect(skip).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main$/);
  });

  test("sitemap, robots and JSON-LD are served", async ({ page, request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("/services/data-ai");
    expect(xml).toContain("/insights/decisions-are-the-deliverable");
    const robots = await request.get("/robots.txt");
    expect(await robots.text()).toMatch(/Sitemap: .*\/sitemap\.xml/);
    await page.goto("/insights/recovery-not-backup");
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    const types = ld.map((t) => JSON.parse(t)["@type"]);
    expect(types).toEqual(expect.arrayContaining(["ProfessionalService", "BreadcrumbList", "Article"]));
    const og = await request.get("/opengraph-image");
    expect(og.status()).toBe(200);
    expect(og.headers()["content-type"]).toContain("image/png");
  });

  test("security headers are set", async ({ request }) => {
    const res = await request.get("/");
    const h = res.headers();
    expect(h["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(h["x-powered-by"]).toBeUndefined();
  });
});
