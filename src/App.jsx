// Dependencies
import React, { useState, useEffect } from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import { useApi } from "./useApi";

// Components
import GenSelector from "./components/GenSelector";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import PokemonPage from "./components/PokemonPage/PokemonPage";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";

// Styles
import "./styles/styles.css";

// Data
import pokedexGenList from "./data/pokedexGenList";

const mapResults = ({ results }) =>
  results.map(({ url, name }) => ({
    url,
    name,
    id: parseInt(url.match(/\/(\d+)\//)[1]),
  }));

const App = () => {
  // Set the url to fetch the Pokédex generation data
  const [pokeDataUrl, setPokeDataUrl] = useState(pokedexGenList[0].dataUrl);

  const match = useMatch("/pokemon/:name");
  const [pokeRegion, setPokeRegion] = useState("Kanto");
  const { data: pokemonList, error, isLoading } = useApi(pokeDataUrl, mapResults);
  const [searchTerm, setSearchTerm] = useState("");

  // Define which Pokémon data should be displayed based on the generation
  useEffect(() => {
    const gen = pokedexGenList.find((gen) => gen.region === pokeRegion);
    setPokeDataUrl(gen.dataUrl);
  }, [pokeRegion]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // Filter the list based on the search term
  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.includes(searchTerm.toLowerCase());
  });

  let next = null;
  let previous = null;

  // Handle the logic for the previous and next links
  if (match && match.params) {
    const pokemonIndex = filteredPokemon.findIndex(
      ({ name }) => name === match.params.name,
    );
    previous = pokemonIndex > 0 ? filteredPokemon[pokemonIndex - 1] : null;
    next =
      pokemonIndex < filteredPokemon.length
        ? filteredPokemon[pokemonIndex + 1]
        : null;
  }

  return (
    <>
      <h1 id="main-page-title">{pokeRegion} Pokédex</h1>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <GenSelector
                pokeRegion={pokeRegion}
                setPokeRegion={setPokeRegion}
              />
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              {filteredPokemon.length === 0 ? (
                <p className="not-found-message">No Pokémon found</p>
              ) : (
                <PokemonList pokemonList={filteredPokemon} />
              )}
            </>
          }
        />
        <Route
          exact
          path="/pokemon/:name"
          element={
            <PokemonPage
              pokemonList={filteredPokemon}
              previous={previous}
              next={next}
            />
          }
        />
      </Routes>
    </>
  );
};

export default App;
