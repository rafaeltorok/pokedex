// Playwright dependencies
import { test, describe, expect, beforeEach } from "@playwright/test"

// Helper functions
import assertStatsRowValue from "./helpers/assertStatsRowValue"
import assertHiddenAbilities from "./helpers/assertHiddenAbilities"

// Tests
describe("Pokédex", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:8080")
  })

  describe("The main page", () => {
    test("front page can be opened", async ({ page }) => {
      // Confirm the basic rendered text is visible
      await expect(page.getByText(/kanto pokédex/i)).toBeVisible()
      await expect(page.getByText("ivysaur")).toBeVisible()
      await expect(page.getByText("Pokémon and Pokémon character names are trademarks of Nintendo.")).toBeVisible()
    })

    test("a pokémon info card can be clicked on", async ({ page }) => {
      // Target a Pokémon card on the list and click on it
      const pokeCard = await page.getByRole("link", { name: /ivysaur/i })
      await pokeCard.click()

      // Confirm the Pokémon info is present
      await expect(page.getByText(/overgrow/i)).toBeVisible()
      await expect(page.getByText(/chlorophyll/i)).toBeVisible()
    })
  })

  describe("Pokémon info page", () => {
    test("the previous button should not be visible on the first pokédex item", async ({ page }) => {
      // Choose the Pokémon with ID #1
      const pokeCard = await page.getByRole("link", { name: /bulbasaur/i })
      await pokeCard.click()

      // Assert the correct page has been displayed
      await expect(page.getByText(/bulbasaur/i)).toBeVisible()
      await expect(page.getByRole("link", { name: /home/i })).toBeVisible()
      await expect(page.getByRole("link", { name: /next/i })).toBeVisible()

      // Confirm the previous button is not present
      await expect(page.getByRole("link", { name: /previous/i })).not.toBeVisible()
    })

    test("the next button should not be visible on the last pokédex item", async ({ page }) => {
      // Force an exact match, to prevent conflicts with the name of Mewtwo
      const pokeCard = await page.getByRole("link", { name: /^mew$/i })
      await pokeCard.click()

      // Assert the correct page has been displayed
      await expect(page.getByText(/^mew$/i)).toBeVisible()
      await expect(page.getByRole("link", { name: /previous/i })).toBeVisible()
      await expect(page.getByRole("link", { name: /home/i })).toBeVisible()

      // Confirm the next button is not present
      await expect(page.getByRole("link", { name: /next/i })).not.toBeVisible()
    })

    test("the home button sends back to the main page", async ({ page }) => {
      // Select a pokémon
      const pokeCard = await page.getByRole("link", { name: /mewtwo/i })
      await pokeCard.click()

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/mewtwo/i)).toBeVisible()

      // Select the home button
      await page.getByRole("link", { name: /home/i }).click()

      // Assert it has returned to the main page
      await expect(page.getByRole("link", { name: /venusaur/i })).toBeVisible()
      await expect(page.getByRole("link", { name: /charizard/i })).toBeVisible()
      await expect(page.getByRole("link", { name: /blastoise/i })).toBeVisible()
    })

    test("all stats are present on the pokémon info card", async ({ page }) => {
      // Select a pokémon
      const pokeCard = await page.getByRole("link", { name: /mewtwo/i })
      await pokeCard.click()

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/mewtwo/i)).toBeVisible()

      // Assert each row has the correct value
      await assertStatsRowValue(page, "speed", "130")
      await assertStatsRowValue(page, "special defense", "90")
      await assertStatsRowValue(page, "special attack", "154")
      await assertStatsRowValue(page, "defense", "90")
      await assertStatsRowValue(page, "attack", "110")
      await assertStatsRowValue(page, "hp", "106")
    })

    test("two abilities should be correctly displayed", async ({ page }) => {
      // Select a pokémon
      const pokeCard = await page.getByRole("link", { name: /mewtwo/i })
      await pokeCard.click()

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/mewtwo/i)).toBeVisible()

      // Assert the hidden abilities are correct
      await assertHiddenAbilities(page, ["pressure", "unnerve"])
    })

    test("a single ability should be correctly displayed", async ({ page }) => {
      // Select a pokémon
      const pokeCard = await page.getByRole("link", { name: /^mew$/i })
      await pokeCard.click()

      // Confirm the pokémon info page has opened
      await expect(page.getByText(/^mew$/i)).toBeVisible()

      // Assert the hidden ability is correct
      await assertHiddenAbilities(page, ["synchronize"])
    })
  })
})
