// Dependencies
import React from "react";

// Styles
import "../../styles/pokemonPage/pokemonStats.css";

// Component
export default function PokemonStats({ pokemon, formatName }) {
  // Map each stat name to its respective value
  const stats = pokemon.stats
    .map((stat) => ({
      name: formatName(stat.stat.name),
      value: stat.base_stat,
    }))
    .reverse();

  // Calculate the total sum of all base stats
  const calculateTotalStats = (total, stat) => {
    return total + stat.value;
  };

  return (
    <div className="pokemon-stats" data-testid="stats">
      <table>
        <tbody>
          {stats.map(({ name, value }) => (
            <tr key={name}>
              <td className="pokemon-stats-name">{name}</td>
              <td className="pokemon-stats-value">{value}</td>
            </tr>
          ))}
          {
            <tr key="total-stats">
              <td className="pokemon-stats-name">Total</td>
              <td className="pokemon-stats-value">
                {stats.reduce(calculateTotalStats, 0)}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}
