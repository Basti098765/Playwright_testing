import { test, expect } from "@playwright/test";
import { BasePage } from "../pages/baseTest";
let basePage: BasePage;

test.beforeEach(async ({ page }) => {
  basePage = new BasePage(page, "https://www.wikipedia.org/");
  await basePage.goto();
});

test(
  "wikipedia homepage",
  {
    tag: ["@instable", "@visual"],
    annotation: {
      type: "issue",
      description:
        "Instable test in pipeline because of different fonts beeing used",
    },
  },
  async ({ page }, testInfo) => {
    await basePage.checkScreenshotWithoutHover(
      testInfo.title,
      page.getByLabel("Top languages")
    );
  }
);
