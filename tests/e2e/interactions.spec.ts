import { expect, test } from "@playwright/test";

test.describe("mobile menu", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("opens, traps focus, closes with Escape and restores focus", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await expect(dialog).toBeVisible();
    await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
    // Focus starts inside the dialog and stays there when tabbing past the end.
    await expect(dialog.getByRole("link").first()).toBeFocused();
    // Focus cycles through the dialog and the visible Close button, never into the page behind.
    const closeButton = page.getByRole("button", { name: "Close menu" });
    let reachedClose = false;
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inDialog = await dialog.evaluate((d) => d.contains(document.activeElement));
      const onClose = await closeButton.evaluate((b) => b === document.activeElement);
      expect(inDialog || onClose).toBe(true);
      reachedClose ||= onClose;
    }
    expect(reachedClose).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("navigates and closes on link click", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: /Insights/ }).click();
    await expect(page).toHaveURL(/\/insights$/);
    await expect(page.getByRole("dialog")).toBeHidden();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Notes from the practice.");
  });
});

test.describe("case study filters", () => {
  test("filter by industry and service updates the URL and results", async ({ page }) => {
    await page.goto("/case-studies");
    const count = page.getByTestId("results-count");
    await expect(count).toHaveText("6 scenarios shown");
    await page.getByRole("group", { name: "Filter by industry" }).getByRole("link", { name: "Public sector" }).click();
    await expect(page).toHaveURL(/industry=public-sector/);
    await expect(count).toHaveText("1 scenario shown");
    await expect(page.getByTestId("scenario-grid").getByRole("link")).toHaveCount(1);
    await page.getByRole("group", { name: "Filter by service" }).getByRole("link", { name: "Cybersecurity & resilience" }).click();
    await expect(page.getByTestId("empty-state")).toBeVisible();
    await page.getByRole("link", { name: "Clear filters" }).click();
    await expect(count).toHaveText("6 scenarios shown");
  });

  test("deep links restore filter state and ignore invalid values", async ({ page }) => {
    await page.goto("/case-studies?service=data-ai");
    await expect(page.getByTestId("results-count")).toHaveText("3 scenarios shown");
    await page.goto("/case-studies?industry=<script>");
    await expect(page.getByTestId("results-count")).toHaveText("6 scenarios shown");
  });

  test("every scenario card and detail page is labelled illustrative", async ({ page }) => {
    await page.goto("/case-studies");
    await expect(page.getByTestId("scenario-grid").getByText("Illustrative scenario")).toHaveCount(6);
    await page.getByRole("link", { name: /Mapping important services/ }).click();
    await expect(page.getByText("Illustrative scenario — not a real client")).toBeVisible();
    await expect(page.getByText("No results are claimed")).toBeVisible();
  });
});

test.describe("insights", () => {
  test("paginates and filters by category", async ({ page }) => {
    await page.goto("/insights");
    await expect(page.getByTestId("results-count")).toHaveText("8 articles · page 1 of 2");
    await expect(page.getByTestId("insights-grid").locator("li")).toHaveCount(6);
    const pagination = page.getByRole("navigation", { name: "Pagination" });
    await pagination.getByRole("link", { name: "Next" }).click();
    await expect(page).toHaveURL(/page=2/);
    await expect(page.getByTestId("insights-grid").locator("li")).toHaveCount(2);
    await expect(pagination.getByRole("link", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    await page.getByRole("group", { name: "Category" }).getByRole("link", { name: "Guide" }).click();
    await expect(page.getByTestId("results-count")).toHaveText("3 articles · page 1 of 1");
    await expect(page.getByRole("navigation", { name: "Pagination" })).toHaveCount(0);
  });

  test("article page renders long-form content", async ({ page }) => {
    await page.goto("/insights/decisions-are-the-deliverable");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Decisions are the deliverable");
    await expect(page.locator(".prose-article h2")).toHaveCount(2);
    await expect(page.locator("blockquote")).toHaveCount(1);
  });
});

test.describe("careers", () => {
  test("roles are labelled demo and expand with the keyboard", async ({ page }) => {
    await page.goto("/careers");
    await expect(page.getByText("Demo listings — not real vacancies")).toBeVisible();
    const button = page.getByRole("button", { name: /Senior solution architect/ });
    await button.focus();
    await page.keyboard.press("Enter");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("region", { name: /Senior solution architect/ })).toBeVisible();
  });
});
