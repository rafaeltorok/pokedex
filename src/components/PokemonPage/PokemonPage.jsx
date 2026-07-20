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
        <Link to="/">Go back</Link>
      </div>
      <div className="pokemon-info-card-wrapper">
        <div className="pokemon-info-card-previous-button">
          {previous && <Link to={`/pokemon/${previous.name}`}>◀</Link>}
        </div>

        <div className={`pokemon-page pokemon-type-${type.name}`}>
          <div
            className="pokemon-image"
            style={{ backgroundImage: `url(${pokemon.sprites.front_default})` }}
          />
          <PokemonInfo pokemon={pokemon} />
        </div>

        <div className="pokemon-info-card-next-button">
          {next && <Link to={`/pokemon/${next.name}`}>▶</Link>}
        </div>
      </div>
    </>
  );
};

export default PokemonPage;
