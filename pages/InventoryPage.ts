import { type Page, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly appLogo: string;
  readonly title: string;

  constructor(page: Page) {
    this.page = page;
    this.appLogo = '.app_logo';
    this.title = '.title';
  }

  async verifyPageLoaded() {
    await expect(this.page.locator(this.appLogo)).toBeVisible();
    await expect(this.page.locator(this.title)).toHaveText('Products');
  }
}