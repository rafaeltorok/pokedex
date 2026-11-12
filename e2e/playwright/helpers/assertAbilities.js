import { expect } from "@playwright/test";

export default async function assertAbilities(page, normalAbility, hiddenAbility) {
  if (hiddenAbility) {
    // For Pokémon with a hidden ability
    const normalAbility = await page
      .locator(".pokemon-ability")
      .filter({ hasText: /normal ability/i })
      .locator(".pokemon-ability-name")
      .textContent();
      
    const hiddenAbility = await page
      .locator(".pokemon-ability")
      .filter({ hasText: /hidden ability/i })
      .locator(".pokemon-ability-name")
      .textContent();

    expect(normalAbility).toMatch(new RegExp(`^${normalAbility}$`, "i"));
    expect(hiddenAbility).toMatch(new RegExp(`^${hiddenAbility}$`, "i"));
  } else {
    // For Pokémon with only the normal ability
    const normalAbility = await page
      .locator(".pokemon-ability")
      .filter({ hasText: /normal ability/i })
      .locator(".pokemon-ability-name")
      .textContent();
    
    expect(normalAbility).toMatch(new RegExp(`^${normalAbility}$`, "i"));
  }
}
