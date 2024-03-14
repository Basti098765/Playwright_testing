import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/baseTest';
let basePage: BasePage;

test.beforeEach(async ({ page }) => {

  basePage = new BasePage(
    page,
   'https://www.wikipedia.org/',
  );
  await basePage.goto();
});

test('wikipedia homepage', async ({ page }, testInfo) => {
    await basePage.checkScreenshotWithoutHover(testInfo.title, page.getByLabel('Top languages'));
  });