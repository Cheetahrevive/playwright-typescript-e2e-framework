import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should display login page correctly', async ({ page }) => {
    await expect(page).toHaveURL(/.*login/);
    const isLoaded = await loginPage.verifyLoginPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.login('test@example.com', 'ValidPassword123');
    await page.waitForURL(/.*dashboard/, { timeout: 10000 });
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@example.com', 'WrongPassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
    expect(errorMessage).toContain('Invalid');
  });

  test('should login button be visible', async () => {
    const isVisible = await loginPage.isLoginButtonVisible();
    expect(isVisible).toBeTruthy();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await loginPage.clickForgotPassword();
    await expect(page).toHaveURL(/.*forgot-password/);
  });

  test('should not login with empty email', async () => {
    await loginPage.login('', 'password123');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
  });

  test('should not login with empty password', async () => {
    await loginPage.login('test@example.com', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).not.toBeNull();
  });
});
