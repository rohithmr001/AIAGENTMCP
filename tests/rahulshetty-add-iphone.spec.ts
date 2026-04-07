import { test, expect } from '@playwright/test';

test('login to Rahul Shetty Academy and add iPhone X to cart', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/', { timeout: 60000, waitUntil: 'domcontentloaded' });

  await page.fill('#username', 'rahulshettyacademy');
  await page.fill('#password', 'Learning@830$3mK2');
  await page.check('input[name="radio"][value="user"]');

  // Wait for modal and dismiss if present
  try {
    await page.waitForSelector('#myModal.show', { timeout: 5000 });
    await page.locator('#okayBtn').click();
  } catch (e) {
    // Modal not present
  }

  await page.click('#signInBtn');

  await page.waitForURL('**/shop');
  const iphoneCard = page.locator('.card').filter({ hasText: 'iphone X' });
  await expect(iphoneCard).toBeVisible();
  await iphoneCard.locator('button:has-text("Add ")').click();

  await expect(page.locator('text=Checkout')).toBeVisible();
});