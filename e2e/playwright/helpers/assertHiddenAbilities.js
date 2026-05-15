import { expect } from "@playwright/test"

export default async function assertHiddenAbilities(page, abilities) {
  const hiddenAbilities = await page.locator(".pokemon-ability").filter({ hasText: /hidden ability/i })
  const length = await hiddenAbilities.count()
  
  if (length > 1) {
    // For Pokémons with two abilities
    const firstAbility = await hiddenAbilities.nth(0).locator(".pokemon-ability-name").textContent()
    const secondAbility = await hiddenAbilities.nth(1).locator(".pokemon-ability-name").textContent()
    await expect(firstAbility).toMatch(new RegExp(`^${abilities[0]}$`, "i"))
    await expect(secondAbility).toMatch(new RegExp(`^${abilities[1]}$`, "i"))
  } else {
    // For Pokémons with a single ability
    const firstAbility = await hiddenAbilities.nth(0).locator(".pokemon-ability-name").textContent()
    await expect(firstAbility).toMatch(new RegExp(`^${abilities[0]}$`, "i"))
  }
}
