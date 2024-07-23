import { test, expect } from "@playwright/test";
import { exec } from "child_process";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("password");

  // Wait for navigation after clicking the login button
  await Promise.all([
    page.waitForNavigation(),
    page.getByRole("button", { name: "Login" }).click(),
  ]);

  console.log("Logged in successfully and navigated.");
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator('[name="name"]').fill("Test Hotel");
  await page.locator('[name="city"]').fill("Test City");
  await page.locator('[name="country"]').fill("Test Country");
  await page
    .locator('[name="description"]')
    .fill("This is the description for the Test Hotel");
  await page.locator('[name="pricePerNight"]').fill("100");
  await page.selectOption('select[name="starRating"]', "3");

  // Use exact match for "Budget"
  await page.getByText("Budget", { exact: true }).click();

  await page.getByLabel("Free Wifi").check();
  await page.getByLabel("Parking").check();

  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("4");

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();
});

test.describe('MyHotel Component', () => {
  test('should display hotel details correctly', async ({ page }) => {
    // Mock hotel data
    const mockHotels = [
      {
        _id: '1',
        name: 'Test Hotel',
        description: 'This is the description for the Test Hotel',
        city: 'Test City',
        country: 'Test Country',
        type: 'Budget',
        pricePerNight: 100,
        adultCount: 2,
        childCount: 4,
        starRating: 3,
      },
    ];

    // Intercept the API call to return the mock data
    await page.route('**/api/my-hotels', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockHotels),
      });
    });

    // Navigate to the page
    await page.goto(`${UI_URL}my-hotels`);
    
    // Check for the hotel details with more specific locators
    await expect(page.locator('h2.text-2xl.font-bold.mb-3')).toHaveText('Test Hotel');
    await expect(page.locator('div.whitespace-pre-line.mb-3')).toHaveText('This is the description for the Test Hotel');
    await expect(page.getByText('Test City, Test Country')).toBeVisible();
    // await expect(page.getByText('Budget')).toBeVisible();
    await expect(page.getByText('100 Per night')).toBeVisible();
    await expect(page.getByText('2 adults, 4 children')).toBeVisible();
    await expect(page.getByText('3 Star Rating')).toBeVisible();

    // Check for the presence of action links
    await expect(page.getByRole('link', { name: 'View Details' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Hotels' })).toBeVisible();
  });
});

