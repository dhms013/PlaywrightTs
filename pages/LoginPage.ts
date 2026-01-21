import { expect, type Page } from '@playwright/test';
import { LOGIN_PAGE_SELECTORS } from './LoginPage.selectors';

export type UserType = 'valid' | 'invalid' | 'empty' | 'empty_username' | 'empty_password' | 'locked_out' | 'problem' | 'performance_glitch';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // --- ACTIONS ---

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.page.fill(LOGIN_PAGE_SELECTORS.USERNAME_INPUT, username);
    await this.page.fill(LOGIN_PAGE_SELECTORS.PASSWORD_INPUT, password);
    await this.page.click(LOGIN_PAGE_SELECTORS.LOGIN_BUTTON);
  }

  private getCredentialsForUser(userType: UserType): { username: string; password: string } {
    switch (userType) {
      case 'valid':
        return {
          username: process.env.VALID_USER_USERNAME!,
          password: process.env.VALID_USER_PASSWORD!,
        };
      case 'invalid':
        return {
          username: process.env.VALID_USER_USERNAME!,
          password: process.env.INVALID_USER_PASSWORD!,
        };
      case 'empty':
        return { username: '', password: '' };
      case 'empty_username':
        return { username: '', password: process.env.VALID_USER_PASSWORD! };
      case 'empty_password':
        return { username: process.env.VALID_USER_USERNAME!, password: '' };
      case 'locked_out':
        return {
          username: process.env.LOCKED_OUT_USER_USERNAME!,
          password: process.env.VALID_USER_PASSWORD!,
        };
      case 'problem':
        return {
          username: process.env.PROBLEM_USER_USERNAME!,
          password: process.env.VALID_USER_PASSWORD!,
        };
      case 'performance_glitch':
        return {
          username: process.env.PERFORMANCE_GLITCH_USER_USERNAME!,
          password: process.env.VALID_USER_PASSWORD!,
        };
      default:
        throw new Error(`User type "${userType}" is not defined.`);
    }
  }

  async loginAs(userType: UserType) {
    const credentials = this.getCredentialsForUser(userType);
    await this.login(credentials.username, credentials.password);
  }
  
  // --- ASSERTIONS ---

  async verifyLoginPage() {
    await expect(this.page.locator(LOGIN_PAGE_SELECTORS.LOGIN_LOGO)).toBeVisible();
  }

  async verifyInvalidUser() {
    await expect(this.page.locator(LOGIN_PAGE_SELECTORS.ERROR_MESSAGE)).toHaveText('Epic sadface: Username and password do not match any user in this service');
  }

  async verifyEmptyCredentials() {
    await expect(this.page.locator(LOGIN_PAGE_SELECTORS.ERROR_MESSAGE)).toHaveText('Epic sadface: Username is required');
  }

  async verifyEmptyUsername() {
    await expect(this.page.locator(LOGIN_PAGE_SELECTORS.ERROR_MESSAGE)).toHaveText('Epic sadface: Username is required');
  }

  async verifyEmptyPassword() {
    await expect(this.page.locator(LOGIN_PAGE_SELECTORS.ERROR_MESSAGE)).toHaveText('Epic sadface: Password is required');
  }

  async verifyLockedOutUser() {
    await expect(this.page.locator(LOGIN_PAGE_SELECTORS.ERROR_MESSAGE)).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  }
}
