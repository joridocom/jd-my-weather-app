// location-display.spec.js
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Test metadata: linked to requirement FR06
test.describe('Weather Display Tests', () => {
  test('Location names are displayed correctly', async ({ page }) => {
    test.info().annotations.push({ type: 'requirement', description: 'FR06' }); // Link to FR06
    const filePath = path.join(__dirname, '../../public/data/locations.json');
    const locationData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    await page.goto('http://localhost:8000');
    await page.waitForSelector('#weather-container h2.text-2xl.font-bold.mb-1');
    for (const location of locationData) {
      const cityElement = await page.locator(`text=${location.name}`);
      await expect(cityElement).toBeVisible();
    }
  });
});
test('Location names are displayed correctly', async ({ page }) => {
  // 1. Load the location data from location.json
  const filePath = path.join(__dirname, '../../public/data/locations.json');
  const locationData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 2. Navigate to your weather app's page

  await page.goto('http://localhost:8000'); // Replace with your app's URL

  // Wait for the city elements to be present on the page.
  await page.waitForSelector('#weather-container h2.text-2xl.font-bold.mb-1');

  // 3. Loop through the location data and check if each name is displayed
  for (const location of locationData) {
    const cityName = location.name;

    // 4. Check if the city name is present on the page
    const cityElement = await page.locator(`text=${cityName}`);
    await expect(cityElement).toBeVisible();
  }
});
