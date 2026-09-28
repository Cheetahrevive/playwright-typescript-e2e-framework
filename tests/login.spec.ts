import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const VALID_PASSWORD = 'secret_sauce';

test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', VALID_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('should show error for locked-out user', async () => {
    await loginPage.login('locked_out_user', VALID_PASSWORD);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Sorry, this user has been locked out.');
  });

  test('should show error with wrong password', async () => {
    await loginPage.login('standard_user', 'WrongPassword');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username and password do not match');
  });

  test('should show error with empty username', async () => {
    await loginPage.login('', VALID_PASSWORD);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Username is required');
  });

  test('should show error with empty password', async () => {
    await loginPage.login('standard_user', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Password is required');
  });

  test('should dismiss the error banner via the X button', async () => {
    await loginPage.login('standard_user', 'WrongPassword');
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    await loginPage.dismissError();
    expect(await loginPage.isErrorVisible()).toBeFalsy();
  });

  test('should logout and return to the login page', async ({ page }) => {
    await loginPage.login('standard_user', VALID_PASSWORD);
    await expect(page).toHaveURL(/.*inventory\.html/);
    await loginPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    expect(await loginPage.isLoginButtonVisible()).toBeTruthy();
  });

  test('should mask the password input', async () => {
    const inputType = await loginPage.getPasswordInputType();
    expect(inputType).toBe('password');
  });
});
