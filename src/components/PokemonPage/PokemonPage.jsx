// Dependencies
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../../useApi";

// Components
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import PokemonInfo from "./PokemonInfo";

// Styles
import "../../styles//pokemonPage/pokemonPage.css";
import "../../styles/pokemonTypes.css";

// Component
const PokemonPage = ({ previous, next }) => {
  const { name } = useParams();
  const {
    data: pokemon,
    error,
    isLoading,
  } = useApi(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const { type } = pokemon.types.find((type) => type.slot === 1);

  return (
    <>
      <div className="links">
        {previous && <Link to={`/pokemon/${previous.name}`}>Previous</Link>}
        <Link to="/">Home</Link>
        {next && <Link to={`/pokemon/${next.name}`}>Next</Link>}
      </div>
      <div className={`pokemon-page pokemon-type-${type.name}`}>
        <div
          className="pokemon-image"
          style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
        />
        <PokemonInfo pokemon={pokemon} />
      </div>
    </>
  );
};

export default PokemonPage;
