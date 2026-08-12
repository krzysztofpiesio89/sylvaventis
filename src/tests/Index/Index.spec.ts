import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });
 
  test('Should have at least one h1 tag on the homepage', async ({ page }) => {
    const h1 = await page.locator('h1');
    const count = await h1.count();
    await expect(count).toBeGreaterThan(0);
  });
});
