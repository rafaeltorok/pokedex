// Dependencies
import React, { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useApi } from './useApi'

// Components
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import PokemonPage from './components/PokemonPage'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'

const mapResults = (({ results }) => results.map(({ url, name }) => ({
  url,
  name,
  id: parseInt(url.match(/\/(\d+)\//)[1])
})))

const App = () => {
  const match = useMatch('/pokemon/:name')
  const { data: pokemonList, error, isLoading } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=151', mapResults)
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <ErrorMessage error={error} />
  }

  // Filter the list based on the search term
  const filteredPokemon = pokemonList.filter((pokemon) => {
    return pokemon.name.includes(searchTerm.toLowerCase())
  })

  let next = null
  let previous = null

  // Handle the logic for the previous and next links
  if (match && match.params) {
    const pokemonIndex = filteredPokemon.findIndex(({ name }) => name === match.params.name)
    previous = (pokemonIndex > 0) ?
      filteredPokemon[pokemonIndex - 1] :
      null
    next = (pokemonIndex < filteredPokemon.length) ?
      filteredPokemon[pokemonIndex + 1] :
      null
  }

  return (
    <>
      <h1 id='main-page-title'>Kanto Pokédex</h1>
      <Routes>
        <Route exact path="/" element={
          <>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PokemonList pokemonList={filteredPokemon} />
          </>
        } />
        <Route exact path="/pokemon/:name" element={
          <PokemonPage pokemonList={filteredPokemon} previous={previous} next={next} />
        } />
      </Routes>
    </>
  )
}

export default App
