// Dependencies
import React from "react";

// Styles
import "../styles/pokemonAbility.css";

// Component
const PokemonAbility = ({ abilityName }) => (
  <div className="pokemon-ability">
    <div className="pokemon-ability-type">Hidden ability</div>
    <div className="pokemon-ability-name">{abilityName}</div>
  </div>
);

export default PokemonAbility;
