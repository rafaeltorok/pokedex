// Playwright dependencies
import { test, describe, expect, beforeEach } from "@playwright/test";

// Tests
describe("Main page", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  describe("The main page", () => {
    test("front page can be opened", async ({ page }) => {
      // Confirm there are elements present on the page
      await expect(page.getByText(/kanto pokédex/i)).toBeVisible();
      await expect(page.getByText("ivysaur")).toBeVisible();
      await expect(
        page.getByText(
          "Pokémon and Pokémon character names are trademarks of Nintendo.",
        ),
      ).toBeVisible();
    });

    test("a pokémon info card can be clicked on", async ({ page }) => {
      // Target a Pokémon card on the list and click on it
      const pokeCard = await page.getByRole("link", { name: /ivysaur/i });
      await pokeCard.click();

      // Confirm the Pokémon info is present
      await expect(page.getByText(/overgrow/i)).toBeVisible();
      await expect(page.getByText(/chlorophyll/i)).toBeVisible();
    });

    test("the search bar should be displayed", async ({ page }) => {
      await expect(
        page.getByRole("searchbox", { name: /search pokémon.../i }),
      ).toBeVisible();
    });
  });
});
