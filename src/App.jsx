import React from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import { useApi } from './useApi'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import PokemonPage from './PokemonPage'
import PokemonList from './PokemonList'

const mapResults = (({ results }) => results.map(({ url, name }) => ({
  url,
  name,
  id: parseInt(url.match(/\/(\d+)\//)[1])
})))

const App = () => {
  const match = useMatch('/pokemon/:name')
  const { data: pokemonList, error, isLoading } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=151', mapResults)

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <ErrorMessage error={error} />
  }

  let next = null
  let previous = null
  const minEntryNumber = 1
  const maxEntryNumber = 151

  if (match && match.params) {
    const pokemonId = pokemonList.find(({ name }) => name === match.params.name).id
    previous = (pokemonId > minEntryNumber) ?
      pokemonList.find(({ id }) => id === pokemonId - 1) :
      null
    next = (pokemonId < maxEntryNumber) ?
      pokemonList.find(({ id }) => id === pokemonId + 1) :
      null
  }

  return (
    <>
      <h1 id='main-page-title'>Kanto Pokédex</h1>
      <Routes>
        <Route exact path="/" element={<PokemonList pokemonList={pokemonList} />} />
        <Route exact path="/pokemon/:name" element={
          <PokemonPage pokemonList={pokemonList} previous={previous} next={next} />
        } />
      </Routes>
    </>
  )
}

export default App
