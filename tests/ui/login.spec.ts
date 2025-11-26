import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { allure } from 'allure-playwright';
test.describe('UI Login area', () => {
  test('valid login', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/admin');
    await login.login(process.env.UI_USERNAME || 'admin', process.env.UI_PASSWORD || 'password');

    // assert something visible on success — site dependent
    await expect(page).toHaveURL(/admin|rooms/);
  });

  test('invalid login shows validation', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto('/admin');
    await login.login('bad', 'creds');
    // expect validation msg
    await expect(page.locator('.alert')).toHaveText(/Invalid/i);
  });
});
