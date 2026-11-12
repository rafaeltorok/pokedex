import React from "react";
import "../styles/pokemonAbility.css";

export default function PokemonAbility({
  normalAbility,
  hiddenAbility,
  formatName,
}) {
  return (
    <div className="pokemon-abilities">
      {normalAbility && (
        <div className="pokemon-ability">
          <div className="pokemon-ability-type">Normal ability</div>
          <div className="pokemon-ability-name">
            {formatName(normalAbility.ability.name)}
          </div>
        </div>
      )}
      {hiddenAbility && (
        <div className="pokemon-ability">
          <div className="pokemon-ability-type">Hidden ability</div>
          <div className="pokemon-ability-name">
            {formatName(hiddenAbility.ability.name)}
          </div>
        </div>
      )}
    </div>
  );
}
