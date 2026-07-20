// Playwright dependencies
import { test, describe, expect } from "@playwright/test";

// Helper functions
import assertStatsRowValue from "./helpers/assertStatsRowValue";
import assertHiddenAbilities from "./helpers/assertHiddenAbilities";

// Tests
describe("Pokémon info page", () => {
  describe("the navigation links", () => {
    test("the previous button should not be visible on the first pokédex entry", async ({
      page,
    }) => {
      // Choose the Pokémon with ID #1
      await page.goto("/pokemon/bulbasaur");

      // Assert the correct page has been displayed
      await expect(page.getByText(/bulbasaur/i)).toBeVisible();
      await expect(page.getByRole("link", { name: /go back/i })).toBeVisible();
      await expect(page.getByRole("link", { name: "▶" })).toBeVisible();

      // Confirm the previous button is not present
      await expect(page.getByRole("link", { name: "◀" })).not.toBeVisible();
    });

    test("the next button should not be visible on the last pokédex entry", async ({
      page,
    }) => {
      // Select the last Pokédex entry
      await page.goto("/pokemon/mew");

      // Assert the correct page has been displayed
      await expect(page.getByText(/^mew$/i)).toBeVisible();
      await expect(page.getByRole("link", { name: "◀" })).toBeVisible();
      await expect(page.getByRole("link", { name: /go back/i })).toBeVisible();

      // Confirm the next button is not present
      await expect(page.getByRole("link", { name: "▶" })).not.toBeVisible();
    });

    test("the home button sends back to the main page", async ({ page }) => {
      // Select a pokémon
      await page.goto("/pokemon/mewtwo");

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/mewtwo/i)).toBeVisible();

      // Select the home button
      await page.getByRole("link", { name: /go back/i }).click();

      // Assert it has returned to the main page
      await expect(page.getByRole("link", { name: /venusaur/i })).toBeVisible();
      await expect(
        page.getByRole("link", { name: /charizard/i }),
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: /blastoise/i }),
      ).toBeVisible();
    });
  });

  describe("the information table", () => {
    test("all stats are present on the pokémon info card", async ({ page }) => {
      // Select a pokémon
      await page.goto("/pokemon/mewtwo");

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/mewtwo/i)).toBeVisible();

      // Assert each row has the correct value
      await assertStatsRowValue(page, "speed", "130");
      await assertStatsRowValue(page, "special defense", "90");
      await assertStatsRowValue(page, "special attack", "154");
      await assertStatsRowValue(page, "defense", "90");
      await assertStatsRowValue(page, "attack", "110");
      await assertStatsRowValue(page, "hp", "106");
    });

    test("two abilities should be correctly displayed", async ({ page }) => {
      // Select a pokémon
      await page.goto("/pokemon/mewtwo");

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/mewtwo/i)).toBeVisible();

      // Assert the hidden abilities are correct
      await assertHiddenAbilities(page, ["pressure", "unnerve"]);
    });

    test("a single ability should be correctly displayed", async ({ page }) => {
      // Select a pokémon
      await page.goto("/pokemon/mew");

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/^mew$/i)).toBeVisible();

      // Assert the hidden ability is correct
      await assertHiddenAbilities(page, ["synchronize"]);
    });

    test("the id number should be present", async ({ page }) => {
      // Select a pokémon
      await page.goto("/pokemon/bulbasaur");

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/^bulbasaur$/i)).toBeVisible();

      // Assert the ID number is being correctly displayed
      await expect(page.getByText("#1")).toBeVisible();
    });

    test("the pokémon types should be correctly displayed", async ({
      page,
    }) => {
      // Select a pokémon
      await page.goto("/pokemon/charizard");

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/^charizard$/i)).toBeVisible();

      // Assert all the Pokémon types are present on the table
      await expect(page.getByText(/^fire$/i)).toBeVisible();
      await expect(page.getByText(/^flying$/i)).toBeVisible();
    });
  });
});
