import { type Page, expect } from '@playwright/test';
import { INVENTORY_PAGE_SELECTORS } from './InventoryPage.selectors';

export class InventoryPage {
  readonly page: Page;


  constructor(page: Page) {
    this.page = page;
  }

  // --- ACTIONS ---

  async addToCart() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.ADD_TO_CART_BTN);
  }
  async removeFromCart() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.REMOVE_BTN);
  }
  async azZFilter() {
    await this.page.selectOption(INVENTORY_PAGE_SELECTORS.SORT_FILTER, 'az');
  }
  async zaFilter() {
    await this.page.selectOption(INVENTORY_PAGE_SELECTORS.SORT_FILTER, 'za');
  }
  async lohiFilter() {
    await this.page.selectOption(INVENTORY_PAGE_SELECTORS.SORT_FILTER, 'lohi');
  }
  async hiloFilter() {
    await this.page.selectOption(INVENTORY_PAGE_SELECTORS.SORT_FILTER, 'hilo');
  }
  async openSidebar() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.OPEN_BURGER_BTN);
  }
  async closeSidebar() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.CLOSE_BURGER_BTN);
  }
  async gotoAllItems() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.OPEN_BURGER_BTN);
    await this.page.click(INVENTORY_PAGE_SELECTORS.ALL_ITEM_BTN);
  }
  async gotoAbout() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.OPEN_BURGER_BTN);
    await this.page.click(INVENTORY_PAGE_SELECTORS.ABOUT_BTN);
  }
  async logout() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.OPEN_BURGER_BTN);
    await this.page.click(INVENTORY_PAGE_SELECTORS.LOGOUT_BTN);
  }
  async resetAppState() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.OPEN_BURGER_BTN);
    await this.page.click(INVENTORY_PAGE_SELECTORS.RESET_APP_STATE_BTN);
  }
  async gotoShoppingCart() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.SHOPPING_CART_BTN);
  }
  async continueShopping() {
    await this.page.click(INVENTORY_PAGE_SELECTORS.CONTINUE_SHOPPING_BTN);
  }
  
  // --- ASSERTIONS ---

  async verifyPageLoaded() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.APP_LOGO)).toBeVisible();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.TITLE)).toHaveText('Products');
  }
  async verifyExpectedProblemUser() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.INVENTORY_CONTAINER)).toHaveAttribute('src', '/static/media/sl-404.168b1cce.jpg');
  }
  async verifyUnexpectedProblemUser() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.INVENTORY_CONTAINER)).toHaveAttribute('src', 'sauce-backpack');
  }
  async verifyProductAdded() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.REMOVE_BTN)).toBeVisible();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SHOPPING_CART_BADGE)).toHaveText('1');
  }
  async verifyProductRemoved() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.ADD_TO_CART_BTN)).toBeVisible();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SHOPPING_CART_BADGE)).toBeHidden();
  }
  async verifyAzFilter() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SORT_FILTER)).toHaveValue('az');
  }
  async verifyZaFilter() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SORT_FILTER)).toHaveValue('za');
  }
  async verifyLohiFilter() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SORT_FILTER)).toHaveValue('lohi');
  }
  async verifyHiloFilter() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SORT_FILTER)).toHaveValue('hilo');
  }
  async verifySidebarOpened() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SIDEBAR_MENU_WRAP)).toBeVisible();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.CLOSE_BURGER_BTN)).toBeVisible();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SIDEBAR_MENU)).toBeVisible();
    const allItemsLink = this.page.getByText('All Items');
    const aboutLink = this.page.getByText('About');
    const logoutLink = this.page.getByText('Logout');
    const resetLink = this.page.getByText('Reset App State');
    
    await Promise.all([
      expect(allItemsLink).toBeVisible(),
      expect(aboutLink).toBeVisible(),
      expect(logoutLink).toBeVisible(),
      expect(resetLink).toBeVisible(),
    ]);
  }
  async verifySidebarClosed() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SIDEBAR_MENU_WRAP)).toBeHidden();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.CLOSE_BURGER_BTN)).toBeHidden();
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SIDEBAR_MENU)).toBeHidden();
  }
  async verifyAllItemsPage() {
    await expect(this.page).toHaveURL(/.*inventory.html/);
  }
  async verifyAboutPage() {
    await expect(this.page).toHaveURL('https://saucelabs.com/');
  }
  async verifyLoggedOut() {
    await expect(this.page).toHaveURL(/.*index.html/);
  }
  async verifyAppStateReset() {
    await expect(this.page.locator(INVENTORY_PAGE_SELECTORS.SHOPPING_CART_BADGE)).toBeHidden();
  }
  async verifyShoppingCartPage() {
    await expect(this.page).toHaveURL(/.*cart.html/);
  }
}