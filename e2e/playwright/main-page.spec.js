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

    test("the generation selector should be displayed", async ({ page }) => {
      await expect(
        page.getByRole("combobox", { name: /generation selector/i }),
      ).toBeVisible();
    });

    test("should display Kanto Pokémon by default", async({ page }) => {
      const genSelector = page.getByRole("combobox", { name: /generation selector/i });

      // Assert the selector is displaying the correct generation and location
      await expect(
        genSelector.locator("option:checked")
      ).toHaveText("Gen I - Kanto");

      // Assert the starters from the respective generation are present
      await expect(page.getByRole("link", { name: /bulbasaur/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /charmander/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /squirtle/i })).toBeVisible();
    });

    test("Pokémon from other generations should not be displayed", async({ page }) => {
      const genSelector = page.getByRole("combobox", { name: /generation selector/i });

      // Assert the selector is displaying the correct generation and location
      await expect(
        genSelector.locator("option:checked")
      ).toHaveText("Gen I - Kanto");

      // Assert the starters from other generations are not present
      await expect(page.getByRole("link", { name: /chikorita/i })).not.toBeVisible();
      await expect(page.getByRole("link", { name: /cyndaquil/i })).not.toBeVisible();
      await expect(page.getByRole("link", { name: /totodile/i })).not.toBeVisible();

      await expect(page.getByRole("link", { name: /treecko/i })).not.toBeVisible();
      await expect(page.getByRole("link", { name: /torchic/i })).not.toBeVisible();
      await expect(page.getByRole("link", { name: /mudkip/i })).not.toBeVisible();
    });

    test("selecting Johto should display the Generation II Pokémon", async ({ page }) => {
      const genSelector = page.getByRole("combobox", { name: /generation selector/i });

      // Select the correct region from the select menu
      await genSelector.selectOption("Gen II - Johto");
    
      // Assert the starters are being correctly displayed
      await expect(page.getByRole("link", { name: /chikorita/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /cyndaquil/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /totodile/i })).toBeVisible();
    });

    test("selecting Hoenn should display the Generation III Pokémon", async ({ page }) => {
      const genSelector = page.getByRole("combobox", { name: /generation selector/i });

      // Select the correct region from the select menu
      await genSelector.selectOption("Gen III - Hoenn");
    
      // Assert the starters are being correctly displayed
      await expect(page.getByRole("link", { name: /treecko/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /torchic/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /mudkip/i })).toBeVisible();
    });

    test("selecting Sinnoh should display the Generation IV Pokémon", async ({ page }) => {
      const genSelector = page.getByRole("combobox", { name: /generation selector/i });

      // Select the correct region from the select menu
      await genSelector.selectOption("Gen IV - Sinnoh");
    
      // Assert the starters are being correctly displayed
      await expect(page.getByRole("link", { name: /turtwig/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /chimchar/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /piplup/i })).toBeVisible();
    });

    test("choosing a generation and then selecting another should correctly update the list", async ({ page }) => {
      const genSelector = page.getByRole("combobox", { name: /generation selector/i });

      // Select another generation apart from the default one
      await genSelector.selectOption("Gen III - Hoenn");
    
      // Assert the starters are being correctly displayed
      await expect(page.getByRole("link", { name: /treecko/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /torchic/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /mudkip/i })).toBeVisible();

      // Select the default generation again
      await genSelector.selectOption("Gen I - Kanto");

      // Assert the starters are being correctly displayed
      await expect(page.getByRole("link", { name: /bulbasaur/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /charmander/i })).toBeVisible();
      await expect(page.getByRole("link", { name: /squirtle/i })).toBeVisible();
    });
  });
});
