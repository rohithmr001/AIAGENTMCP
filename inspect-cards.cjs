const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://rahulshettyacademy.com/angularpractice/shop');
  await page.waitForLoadState('networkidle');
  const cards = await page.$$('.card');
  for (const card of cards) {
    const title = await card.$eval('.card-title', n => n.textContent.trim()).catch(() => '');
    const button = await card.$('button');
    const btnText = button ? await button.textContent() : '';
    console.log(`Title: ${title}, Button: ${btnText}`);
  }
  await browser.close();
})();