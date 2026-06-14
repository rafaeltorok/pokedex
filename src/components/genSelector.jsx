// Dependencies
import React from "react";
import pokedexGenList from "../data/pokedexGenList";

// Styles
import "../styles/genSelector.css";

// Component
export default function GenSelector({ pokeRegion, setPokeRegion }) {
  return (
    <div className="gen-selector-area">
      <form>
        <select
          onChange={(e) => setPokeRegion(e.target.value)}
          value={pokeRegion}
          aria-label="generation selector"
        >
          {pokedexGenList.map((gen) => (
            <option
              key={gen.region}
              value={gen.region}
            >
              {gen.displayName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
