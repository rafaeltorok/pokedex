import { expect } from "@playwright/test"

export default async function assertStatsRowValue(page, name, value) {
  // Filter the row based on the stat name
  const row = await page.locator("tr").filter({ 
    has: page.locator("td.pokemon-stats-name", { hasText: new RegExp(`^${name}$`, "i") })
  })

  // Select the stat value element and assert it is correct
  const pokeStatsValue = await row.locator("td.pokemon-stats-value").textContent()
  await expect(pokeStatsValue).toBe(value)
}
