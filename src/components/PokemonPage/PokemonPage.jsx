import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useApi } from "../../useApi";
import { useSwipeable } from "react-swipeable";

// Components
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import PokemonInfo from "./PokemonInfo";

// CSS styles
import "../../styles//pokemonPage/pokemonPage.css";

export default function PokemonPage({ previous, next }) {
  const { name } = useParams();
  const {
    data: pokemon,
    error,
    isLoading,
  } = useApi(`https://pokeapi.co/api/v2/pokemon/${name}`);

  // Setup the React Router navigator
  const navigate = useNavigate();

  // Handle the Arrow Keys navigation
  useEffect(() => {
    // Only enable keyboard navigation after the page has loaded successfully
    if (isLoading || error) return;

    function onKeyDown(event) {
      // Left Arrow key
      if (event.key === "ArrowLeft" && previous) {
        navigate(`/pokemon/${previous.name}`);
      }

      // Right Arrow key
      if (event.key === "ArrowRight" && next) {
        navigate(`/pokemon/${next.name}`);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previous, next, isLoading, error]);

  // Handles the Touch screen swipe to change the page
  const swipeHandler = useSwipeable({
    onSwiped: (eventData) => {
      // Previous page
      if (eventData.dir === "Right" && previous) {
        navigate(`/pokemon/${previous.name}`);
      }

      // Next page
      if (eventData.dir === "Left" && next) {
        navigate(`/pokemon/${next.name}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const gradient = pokemon.types[1]
    ? `linear-gradient(to bottom right, var(--type-${pokemon.types[0].type.name}) 40%, var(--type-${pokemon.types[1].type.name}) 60%)`
    : `linear-gradient(to bottom right, var(--type-${pokemon.types[0].type.name}) 50%, white 100%)`;

  return (
    <div className="pokemon-page">
      <div className="pokemon-info-card-wrapper" {...swipeHandler}>
        <div className="pokemon-info-card-previous-button">
          {previous && <Link to={`/pokemon/${previous.name}`}>◀</Link>}
        </div>

        <div
          className="pokemon-table"
          style={{ background: gradient }}
        >
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

      <Link to="/" className="return-button">Return</Link>
    </div>
  );
};
