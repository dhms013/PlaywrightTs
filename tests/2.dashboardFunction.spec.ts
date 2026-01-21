import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Dashboard Functionality', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.goto();
        await loginPage.loginAs('valid');
    });
    test('should add product to the cart', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'critical' });
        await inventoryPage.addToCart();
        await inventoryPage.verifyProductAdded();
    });
    test('should remove product from the cart', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'critical' });
        await inventoryPage.addToCart();
        await inventoryPage.removeFromCart();
        await inventoryPage.verifyProductRemoved();
    });
    test('should filter products from A to Z', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.azZFilter();
        await inventoryPage.verifyAzFilter();
    });
    test('should filter products from Z to A', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.zaFilter();
        await inventoryPage.verifyZaFilter();
    });
    test('should filter products from low to high price', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.lohiFilter();
        await inventoryPage.verifyLohiFilter();
    });
    test('should filter products from high to low price', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.hiloFilter();
        await inventoryPage.verifyHiloFilter();
    });
    test('should open and close the sidebar menu', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.openSidebar();
        await inventoryPage.verifySidebarOpened();
        await inventoryPage.closeSidebar();
        await inventoryPage.verifySidebarClosed();
    });
    test('should navigate to All Items page via sidebar', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.gotoAllItems();
        await inventoryPage.verifyPageLoaded();
    });
    test('should navigate to About page via sidebar', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.gotoAbout();
        await inventoryPage.verifyAboutPage();
    });
    test('should log out via sidebar', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'critical' });
        await inventoryPage.logout();
        await loginPage.verifyLoginPage();
    });
    test('should reset app state via sidebar', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'normal' });
        await inventoryPage.addToCart();
        await inventoryPage.resetAppState();
    });
    test('should navigate to the shopping cart and back', async ({ page }) => {
        test.info().annotations.push({ type: 'severity', description: 'critical' });
        await inventoryPage.gotoShoppingCart();
        await inventoryPage.verifyShoppingCartPage();
        await inventoryPage.continueShopping();
        await inventoryPage.verifyPageLoaded();
    });
});