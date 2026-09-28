import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object for the SauceDemo (Swag Labs) login page
 * (https://www.saucedemo.com)
 */
export class LoginPage extends BasePage {
  // Locators
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private errorMessage: Locator;
  private errorDismissButton: Locator;
  private burgerMenuButton: Locator;
  private logoutLink: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorDismissButton = page.locator('[data-test="error-button"]');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Navigate to the login page (the SauceDemo landing page IS the login page)
   */
  async navigateToLogin(): Promise<void> {
    await this.navigate('/');
    await this.waitForPageLoad();
  }

  /**
   * Perform login action
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillText(this.usernameInput, username);
    await this.fillText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.getTextContent(this.errorMessage);
  }

  /**
   * Check if the error banner is currently visible
   */
  async isErrorVisible(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Dismiss the error banner via its X button
   */
  async dismissError(): Promise<void> {
    await this.clickElement(this.errorDismissButton);
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }

  /**
   * Verify login page is loaded
   */
  async verifyLoginPageLoaded(): Promise<boolean> {
    await this.waitForElement(this.usernameInput);
    await this.waitForElement(this.passwordInput);
    await this.waitForElement(this.loginButton);
    return true;
  }

  /**
   * Get the password input's type attribute (used to verify masking)
   */
  async getPasswordInputType(): Promise<string | null> {
    return await this.passwordInput.getAttribute('type');
  }

  /**
   * Log out via the burger menu (usable from the post-login inventory page)
   */
  async logout(): Promise<void> {
    await this.clickElement(this.burgerMenuButton);
    await this.clickElement(this.logoutLink);
  }
}
