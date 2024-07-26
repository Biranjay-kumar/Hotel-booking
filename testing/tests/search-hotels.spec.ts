import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("password");

  await page.getByRole("button", { name: "Login" }).click();
});

test("should show hotel search results", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Ara");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Hotels found in Ara")).toBeVisible();
  await expect(page.getByText("Dublin Getaways UPDATED")).toBeVisible();
});

test("should show hotel detail", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going?").fill("Ara");
  await page.getByRole("button", { name: "Search" }).click();

  await page.getByText("Dublin Getaways UPDATED").click();
  await expect(page).toHaveURL(/detail/);
});
