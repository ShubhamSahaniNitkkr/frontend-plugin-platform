import { test, expect } from '@playwright/test';

test.describe('Dynamic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Email').fill('demo@fpp.dev');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByText('Frontend Plugin Platform')).toBeVisible({
      timeout: 10000,
    });
  });

  test('task plugin adds nav and route works', async ({ page }) => {
    await page.getByText('Marketplace').click();
    const card = page.locator('[class*="Card"]').filter({ hasText: 'Task Manager' });
    await card.getByRole('button', { name: 'Install' }).click();
    await expect(card.getByText('Enabled')).toBeVisible({ timeout: 15000 });

    await page.getByText('Tasks', { exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Tasks' })).toBeVisible();

    await page.getByPlaceholder('New task title...').fill('E2E Test Task');
    await page.getByRole('button', { name: 'Add Task' }).click();
    await expect(page.getByText('E2E Test Task')).toBeVisible({ timeout: 10000 });
  });
});
