import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../../e2e/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4321',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: [
    {
      command: 'npm run dev -w @fpp/api',
      url: 'http://localhost:3001/api/v1/health',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev -w @fpp/host',
      url: 'http://localhost:4321',
      reuseExistingServer: !process.env.CI,
    },
  ],
});
