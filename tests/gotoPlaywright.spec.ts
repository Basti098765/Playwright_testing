import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/baseTest";
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page, "https://playwright.dev/docs/intro");
  await basePage.goto();
});

test(
    "Playwright installation guide",
    {
      tag: [ "@visual", '@instable'],
      annotation: {
        type: "issue",
        description:
          "Different Fonts in between local and git cause Issues",
      },
    },
    async ({ page }, testInfo) => {
      await basePage.checkScreenshotWithoutHover(
        testInfo.title,
        page.getByText('InstallationIntroduction')
      );
    }
  );