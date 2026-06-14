import React from "react";
import pokedexGenList from "../data/pokedexGenList";

export default function GenSelector({ pokeRegion, setPokeRegion }) {
  return (
    <div className="gen-selector-area">
      <form>
        <select onChange={
          (e) => setPokeRegion(e.target.value)}
          value={pokeRegion}
        >
          {pokedexGenList.map((gen) => (
            <>
              <option
                key={gen.region}
                value={gen.region}
              >
                {gen.displayName}
              </option>
            </>
          ))}
        </select>
      </form>
    </div>
  );
}
