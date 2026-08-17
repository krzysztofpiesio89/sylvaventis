import { test, expect } from '@playwright/test';

test.describe('Categories Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should navigate through category pages', async ({ page }) => {
    // Navigate to categories page using href to be language-independent
    await page.locator('nav a[href="/categories"]').first().click();
    await expect(page).toHaveURL('http://localhost:3000/categories');

    // Click the first category card/link and verify navigation
    const categoryLink = page.locator('a[href*="/kategori/"]').first();
    await categoryLink.click();
    await expect(page).toHaveURL(/^http:\/\/localhost:3000\/kategori\//);

    // Go back to categories
    await page.locator('nav a[href="/categories"]').first().click();
    await expect(page).toHaveURL('http://localhost:3000/categories');
  });

  test('should navigate between categories and home', async ({ page }) => {
    // Go to categories
    await page.locator('nav a[href="/categories"]').first().click();
    await expect(page).toHaveURL('http://localhost:3000/categories');

    // Go back home using logo link (href="/")
    await page.locator('nav a[href="/"]').first().click();
    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
