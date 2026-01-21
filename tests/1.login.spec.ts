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
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('valid');
    await inventoryPage.verifyPageLoaded();
  });
  test('should show an error for an invalid user', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('invalid');
    await loginPage.verifyInvalidUser();
  });
  test('should failed to login with empty credentials', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('empty');
    await loginPage.verifyEmptyCredentials();
  });
  test('should failed to login with empty username', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('empty_username');
    await loginPage.verifyEmptyUsername();
  });
  test('should failed to login with empty password', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('empty_password');
    await loginPage.verifyEmptyPassword();
  });
  test('should failed to login with locked out user', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('locked_out');
    await loginPage.verifyLockedOutUser();
  });
  test('should successfully login using problem user account (expected case)', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'normal' });
    await loginPage.loginAs('problem')
    await inventoryPage.verifyPageLoaded();
    await inventoryPage.verifyExpectedProblemUser();
  });
  test('should successfully login using problem user account (unexpected case)', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'critical' });
    await loginPage.loginAs('problem')
    await inventoryPage.verifyPageLoaded();
    await inventoryPage.verifyUnexpectedProblemUser();
  });
  test('should successfully login using performance glitch user account (expected case)', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'normal' });
    const startTime = performance.now();
    await loginPage.loginAs('performance_glitch');
    const endTime = performance.now()
    const loadTime = endTime - startTime;
    const acceptableMinTime = 3000;
    const acceptableMaxTime = 10001;
    await expect(loadTime).toBeGreaterThan(acceptableMinTime)
    await expect(loadTime).toBeLessThan(acceptableMaxTime)
    await inventoryPage.verifyPageLoaded();
  });
  test('should successfully login using performance glitch user account (unexpected case)', async ({ page }) => {
    test.info().annotations.push({ type: 'severity', description: 'normal' });
    const startTime = performance.now();
    await loginPage.loginAs('performance_glitch');
    const endTime = performance.now()
    const loadTime = endTime - startTime;
    const acceptableMaxTime = 2000;
    await expect(loadTime).toBeLessThan(acceptableMaxTime)
    await inventoryPage.verifyPageLoaded();
  });
});