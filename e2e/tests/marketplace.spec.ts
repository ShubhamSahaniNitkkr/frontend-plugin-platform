import { test, expect } from '@playwright/test';

test.describe('Marketplace Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('demo@fpp.dev');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Extension Marketplace')).toBeVisible({
      timeout: 10000,
    });
  });

  test('lands on marketplace and views plugins', async ({ page }) => {
    await expect(page.getByText('Language Pack')).toBeVisible();
    await expect(page.getByText('Task Manager')).toBeVisible();
  });

  test('installs and enables a plugin', async ({ page }) => {
    const calculatorCard = page.locator('text=Calculator').first();
    await expect(calculatorCard).toBeVisible();

    const installBtn = page
      .locator('[class*="Card"]')
      .filter({ hasText: 'Calculator' })
      .getByRole('button', { name: 'Install' });
    await installBtn.click();

    await expect(
      page
        .locator('[class*="Card"]')
        .filter({ hasText: 'Calculator' })
        .getByText('Active')
    ).toBeVisible({ timeout: 15000 });
  });
});
