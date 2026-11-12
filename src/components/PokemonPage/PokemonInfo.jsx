import React from "react";

// Components
import PokemonAbility from "../PokemonAbility";
import PokemonStats from "./PokemonStats";

// Styles
import "../../styles/pokemonPage/pokemonInfo.css";

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
            className={"pokemon-type"}
            style={{ background: `linear-gradient(140deg, var(--type-${type.type.name}) 50%, #ddd 100%)` }}
          >
            {type.type.name}
          </div>
        ))}
      </div>

      <PokemonStats pokemon={pokemon} formatName={formatName} />

      <PokemonAbility
        normalAbility={normalAbility}
        hiddenAbility={hiddenAbility}
        formatName={formatName}
      />
    </div>
  );
}
