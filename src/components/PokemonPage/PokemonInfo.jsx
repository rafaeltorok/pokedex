// Dependencies
import React from "react";

// Components
import PokemonAbility from "../PokemonAbility";
import PokemonStats from "./PokemonStats";

// Styles
import "../../styles/pokemonPage/pokemonInfo.css";

// Component
export default function PokemonInfo({ pokemon }) {
  const formatName = (nameWithDash) => nameWithDash.replace("-", " ");

  // Handle the Pokémon abilities
  const normalAbility = pokemon.abilities.find((ability) => !ability.is_hidden);
  const hiddenAbility = pokemon.abilities.find(
    (ability) => ability.is_hidden === true,
  );

  return (
    <div className="pokemon-info">
      <div className="pokemon-id-field">#{pokemon.id}</div>
      <div className="pokemon-name">{pokemon.name}</div>
      <div className="pokemon-types-container">
        {pokemon.types.map((type) => (
          <div
            key={type.type.name}
            className={`pokemon-type-${type.type.name} pokemon-type`}
          >
            {type.type.name}
          </div>
        ))}
      </div>

      <PokemonStats pokemon={pokemon} formatName={formatName} />

      <div className="pokemon-abilities">
        {normalAbility && (
          <PokemonAbility
            abilityName={formatName(normalAbility.ability.name)}
          />
        )}
        {hiddenAbility && (
          <PokemonAbility
            abilityName={formatName(hiddenAbility.ability.name)}
          />
        )}
      </div>
    </div>
  );
}
