import { Locator, type Page, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly scTargetDefault: Locator|undefined;
  readonly pageUrl: string;
  readonly demoText: string;
  constructor(page: Page, url: string, scTarget?:Locator) {
    this.page = page;

    this.scTargetDefault = scTarget;
    this.pageUrl = url;
    this.demoText = 'Hier ein etwas längerer Text um Inputs zu testen.';
  }

  async goto() {
    await this.page.goto(this.pageUrl);
  }

  async reload() {
    await this.page.reload();
  }

  async checkScreenshotWithoutHover(title: string, target?: Locator) {
    const locTarget = target ? target : this.scTargetDefault;
    await this.page.mouse.move(1, 1);
    await expect(locTarget ? locTarget : this.page).toHaveScreenshot(`${title}.png`);
  }

  async checkScreenshot(title: string, target?: Locator) {
    const locTarget = target ? target : this.scTargetDefault;
    await expect(locTarget ? locTarget : this.page).toHaveScreenshot(`${title}.png`);
  }

  async setViewportSize(x: number, y: number) {
    await this.page.setViewportSize({ width: x, height: y });
    await this.page.reload();
  }
}
