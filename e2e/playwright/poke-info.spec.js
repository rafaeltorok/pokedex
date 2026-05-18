// Playwright dependencies
import { test, describe, expect } from "@playwright/test"

// Helper functions
import assertStatsRowValue from "./helpers/assertStatsRowValue"
import assertHiddenAbilities from "./helpers/assertHiddenAbilities"

// Constants
const baseUrl = "http://localhost:8080"

// Tests
describe("Pokémon info page", () => {
  test("the previous button should not be visible on the first pokédex entry", async ({ page }) => {
    // Choose the Pokémon with ID #1
    await page.goto(`${baseUrl}/pokemon/bulbasaur`)

    // Assert the correct page has been displayed
    await expect(page.getByText(/bulbasaur/i)).toBeVisible()
    await expect(page.getByRole("link", { name: /home/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /next/i })).toBeVisible()

    // Confirm the previous button is not present
    await expect(page.getByRole("link", { name: /previous/i })).not.toBeVisible()
  })

  test("the next button should not be visible on the last pokédex entry", async ({ page }) => {
    // Select the last Pokédex entry
    await page.goto(`${baseUrl}/pokemon/mew`)

    // Assert the correct page has been displayed
    await expect(page.getByText(/^mew$/i)).toBeVisible()
    await expect(page.getByRole("link", { name: /previous/i })).toBeVisible()
    await expect(page.getByRole("link", { name: /home/i })).toBeVisible()

    // Confirm the next button is not present
    await expect(page.getByRole("link", { name: /next/i })).not.toBeVisible()
  })

  test("the home button sends back to the main page", async ({ page }) => {
    // Select a pokémon
    await page.goto(`${baseUrl}/pokemon/mewtwo`)

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
    await page.goto(`${baseUrl}/pokemon/mewtwo`)

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
    await page.goto(`${baseUrl}/pokemon/mewtwo`)

    // Confirm the pokémon info page has opened
    await expect(page.getByText(/mewtwo/i)).toBeVisible()

    // Assert the hidden abilities are correct
    await assertHiddenAbilities(page, ["pressure", "unnerve"])
  })

  test("a single ability should be correctly displayed", async ({ page }) => {
    // Select a pokémon
    await page.goto(`${baseUrl}/pokemon/mew`)

    // Confirm the pokémon info page has opened
    await expect(page.getByText(/^mew$/i)).toBeVisible()

    // Assert the hidden ability is correct
    await assertHiddenAbilities(page, ["synchronize"])
  })
})