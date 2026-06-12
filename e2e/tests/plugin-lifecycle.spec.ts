import { test, expect } from '@playwright/test';

test.describe('Plugin Lifecycle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('demo@fpp.dev');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Frontend Plugin Platform')).toBeVisible({
      timeout: 10000,
    });
  });

  test('views plugin dashboard', async ({ page }) => {
    await page.getByText('Plugin Dashboard').click();
    await expect(page.getByText('Plugin Dashboard')).toBeVisible();
    await expect(page.getByText('Installed')).toBeVisible();
  });

  test('install disable enable flow', async ({ page }) => {
    await page.getByText('Marketplace').click();

    const card = page.locator('[class*="Card"]').filter({ hasText: 'Notifications' });
    await card.getByRole('button', { name: 'Install' }).click();
    await expect(card.getByText('Enabled')).toBeVisible({ timeout: 15000 });

    await card.getByRole('button', { name: 'Disable' }).click();
    await expect(card.getByText('Installed')).toBeVisible({ timeout: 10000 });

    await card.getByRole('button', { name: 'Enable' }).click();
    await expect(card.getByText('Enabled')).toBeVisible({ timeout: 15000 });
  });
});
