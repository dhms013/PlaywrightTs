import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login Feature', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });
  test('should allow a valid user to log in', async ({ page }) => {
    await loginPage.login(process.env.VALID_USER_USERNAME!, process.env.VALID_USER_PASSWORD!);
    await expect.soft(page).toHaveURL(/inventory.html/);
    await expect.soft(page.locator('.app_logo')).toBeVisible();
    await expect.soft(page.locator('.title')).toHaveText('Products');
    await inventoryPage.verifyPageLoaded();
  });
  test('should show an error for an invalid user', async ({ page }) => {
    await loginPage.login(process.env.VALID_USER_USERNAME!, process.env.INVALID_USER_PASSWORD!);
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
  });
  test('should failed to login with empty credentials', async ({ page }) => {
    await loginPage.login('', '');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });
  test('should failed to login with empty username', async ({ page }) => {
    await loginPage.login('', process.env.VALID_USER_PASSWORD!);
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Epic sadface: Username is required');
  });
  test('should failed to login with empty password', async ({ page }) => {
    await loginPage.login(process.env.VALID_USER_USERNAME!, '');
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Epic sadface: Password is required');
  });
  test('should failed to login with locked out user', async ({ page }) => {
    await loginPage.login(process.env.LOCKED_OUT_USER_USERNAME!, process.env.VALID_USER_PASSWORD!);
    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });
  test('should successfully login using problem user account (expected case)', async ({ page }) => {
    await loginPage.login(process.env.PROBLEM_USER_USERNAME!, process.env.VALID_USER_PASSWORD!);
    await inventoryPage.verifyPageLoaded();
  });
  test('should successfully login using performance glitch user account (expected case)', async ({ page }) => {
    const startTime = performance.now();
    await loginPage.login(process.env.PERFORMANCE_GLITCH_USER_USERNAME!, process.env.VALID_USER_PASSWORD!);
    const endTime = performance.now()
    const loadTime = endTime - startTime;
    const acceptableMinTime = 3000;
    const acceptableMaxTime = 10001;
    await expect(loadTime).toBeGreaterThan(acceptableMinTime)
    await expect(loadTime).toBeLessThan(acceptableMaxTime)
  });
});