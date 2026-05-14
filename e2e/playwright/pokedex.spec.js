import { test, describe, expect, beforeEach } from '@playwright/test'

describe('Pokedex', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080')
  })

  test('front page can be opened', async ({ page }) => {
    // Confirm the basic text to be rendered is present
    await expect(page.getByText(/kanto pokédex/i)).toBeVisible()
    await expect(page.getByText('ivysaur')).toBeVisible()
    await expect(page.getByText('Pokémon and Pokémon character names are trademarks of Nintendo.')).toBeVisible()
  })

  test('a pokémon info card can be clicked on', async ({ page }) => {
    // Target a Pokémon card on the list and click on it
    const pokeCard = await page.getByRole('link', { name: 'ivysaur' })
    await pokeCard.click()

    // Confirm the Pokémon info is present
    await expect(page.getByText(/overgrow/i)).toBeVisible()
    await expect(page.getByText(/chlorophyll/i)).toBeVisible()
  })
})
