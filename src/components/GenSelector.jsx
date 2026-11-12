import React from "react";
import pokedexGenList from "../data/pokedexGenList";
import "../styles/genSelector.css";

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
            <option key={gen.region} value={gen.region}>
              {gen.displayName}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
