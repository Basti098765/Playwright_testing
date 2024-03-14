import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/baseTest";
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page, "https://www.example.org/");
  await basePage.goto();
});

test("has title",{ tag: "@demo" }, async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", { tag: "@demo" }, async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test("playwright banner", { tag: "@visual" }, async ({ page }, testInfo) => {
  await page.goto("https://playwright.dev/");

  // Expects page to have a heading with the name of Installation.
  await basePage.checkScreenshot(
    testInfo.title,
    page.getByRole('banner')
  );
});

test(
  "go to example page",
  {
    tag: [ "@visual","@instable"],
    annotation: {
      type: "issue",
      description:
        "Different Fonts in between local and git cause Issues",
    },
  },
  async ({ page }, testInfo) => {
    await basePage.checkScreenshotWithoutHover(
      testInfo.title,
      page.getByText('Example Domain This domain is')
    );
  }
);