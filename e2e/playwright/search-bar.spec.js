// Playwright dependencies
import { test, describe, expect, beforeEach } from "@playwright/test";

// Tests
describe("Search bar", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  describe("basic component rendering", () => {
    test("it can be typed on", async ({ page }) => {
      // Target the search input field and fill it
      let searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await searchField.fill("char");

      // Confirm there it has been typed on
      searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await expect(searchField).toHaveValue("char");
    });

    test("should display a proper message when no Pokémon is found", async ({
      page,
    }) => {
      // Target the search input field and fill it
      const searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await searchField.fill("aaa");

      // Assert the message has been correctly rendered
      await expect(page.getByText(/no pokémon found/i));
    });
  });

  describe("filtering the main page Pokémon list", () => {
    test("the search term should filter the Pokémon list", async ({ page }) => {
      // Target the search input field and fill it
      const searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await searchField.fill("char");

      // Assert the list has been properly filtered
      const pokeCards = await page.getByRole("link").count();
      await expect(pokeCards).toBe(3);

      await expect(page.getByText(/charmander/i)).toBeVisible();
      await expect(page.getByText(/charmeleon/i)).toBeVisible();
      await expect(page.getByText(/charizard/i)).toBeVisible();
    });

    test("clearing the search term should display all available Pokémon again", async ({
      page,
    }) => {
      // Target the search input field and fill it
      let searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await searchField.fill("char");

      // Assert the list has been properly filtered
      let pokeCards = await page.getByRole("link").count();
      await expect(pokeCards).toBe(3);

      await searchField.clear();

      // Confirm it has been cleared
      searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await expect(searchField).toHaveValue("");

      // Confirm the list has returned to normal
      pokeCards = await page.getByRole("link").count();
      await expect(pokeCards).toBe(151);
    });
  });

  describe("testing how the search term affects the Pokémon info page", () => {
    test("the previous button should not be displayed on the first item of the filtered list", async ({
      page,
    }) => {
      // Target the search input field and fill it
      const searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await searchField.fill("char");

      // Select the first Pokémon on the filtered list
      const pokeCard = await page.getByRole("link", { name: /charmander/i });
      await pokeCard.click();

      await expect(page.getByText(/charmander/i)).toBeVisible();

      // Assert the previous button is not rendered
      await expect(page.getByRole("link", { name: "◀" })).not.toBeVisible();
      await expect(page.getByRole("link", { name: /go back/i })).toBeVisible();
      await expect(page.getByRole("link", { name: "▶" })).toBeVisible();
    });

    test("the next button should not be displayed on the last item of the filtered list", async ({
      page,
    }) => {
      // Target the search input field and fill it
      const searchField = await page.getByRole("searchbox", {
        name: /search pokémon.../i,
      });
      await searchField.fill("char");

      // Select the last Pokémon on the filtered list
      const pokeCard = await page.getByRole("link", { name: /charizard/i });
      await pokeCard.click();

      await expect(page.getByText(/charizard/i)).toBeVisible();

      // Assert the previous button is not rendered
      await expect(page.getByRole("link", { name: "◀" })).toBeVisible();
      await expect(page.getByRole("link", { name: /go back/i })).toBeVisible();
      await expect(page.getByRole("link", { name: "▶" })).not.toBeVisible();
    });
  });
});
