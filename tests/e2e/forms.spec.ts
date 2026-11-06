import { expect, test } from "@playwright/test";

// Synthetic test data only (example.com addresses, placeholder names).
test.describe("contact form", () => {
  test("shows accessible validation errors on empty submit", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: /Send demo enquiry/ }).click();
    const name = page.getByLabel("Full name");
    await expect(name).toHaveAttribute("aria-invalid", "true");
    await expect(name).toBeFocused();
    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(page.getByText(/valid email|enter your email/)).toBeVisible();
    await expect(page.getByText("Please choose a topic.")).toBeVisible();
    await expect(page.getByText("Please confirm you understand this is a demo form.")).toBeVisible();
    const describedBy = await name.getAttribute("aria-describedby");
    expect(describedBy).toContain("c-name-error");
  });

  test("submits valid input and shows a demo receipt", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill("Jane Doe");
    await page.getByLabel("Work email").fill("jane@example.com");
    await page.getByLabel("Topic").selectOption("General enquiry");
    await page.getByLabel("Message").fill("This is a synthetic test message for the demo form.");
    await page.getByRole("checkbox").check();
    await page.waitForTimeout(2200); // minimum human fill time enforced server-side
    await page.getByRole("button", { name: /Send demo enquiry/ }).click();
    const receipt = page.getByTestId("demo-receipt");
    await expect(receipt).toBeVisible();
    await expect(receipt).toContainText(/DEMO-[0-9A-F]{6}/);
    await expect(receipt).toContainText("Not delivered");
    await expect(page.getByRole("heading", { name: /enquiry received \(demo\)/ })).toBeFocused();
    await page.getByRole("button", { name: "Start a new demo submission" }).click();
    await expect(page.getByLabel("Full name")).toHaveValue("");
  });
});

test.describe("consultation form", () => {
  test("validates required groups and submits a demo request", async ({ page }) => {
    await page.goto("/consultation");
    await page.getByRole("button", { name: /Send demo request/ }).click();
    await expect(page.getByText("Please choose at least one area.")).toBeVisible();
    await expect(page.getByText("Please enter your organisation.")).toBeVisible();

    await page.getByLabel("Full name").fill("John Doe");
    await page.getByLabel("Work email").fill("john@example.com");
    await page.getByLabel("Organisation", { exact: true }).fill("Example Ltd");
    await page.getByLabel("Industry").selectOption("public-sector");
    await page.getByLabel("Organisation size").selectOption("250–1,000");
    await page.getByLabel("Data & AI enablement").check();
    await page.getByLabel("Timeframe").selectOption("Exploring");
    await page.getByLabel("Describe the challenge").fill("We are deciding whether to replace or extend a legacy case management system.");
    await page.getByLabel(/I understand this is a demo form/).check();
    await page.waitForTimeout(2200);
    await page.getByRole("button", { name: /Send demo request/ }).click();
    await expect(page.getByTestId("demo-receipt")).toContainText("Consultation request received (demo).");
  });
});
