import React from "react";
import "../styles/searchBar.css";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        id="search-field"
        name="search-field"
        type="search"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.trimStart())}
      />
    </div>
  );
}
