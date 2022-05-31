// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
// 🐨 import the following: fetchPokemon, PokemonInfoFallback, PokemonDataView
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  const {status, pokemon, error} = state

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        setState({pokemon, status: 'resolved'})
      },
      error => setState({error, status: 'rejected'}),
     )
  }, [pokemonName])

  if (status === 'idle') {
    return 'Submit a Pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    return (
      <div role="alert">
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
  throw new Error('This Should be Impossible!')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonInfo pokemonName={pokemonName} />
      </div>
    </div>
  )
}

export default App

// 🐨 Have state for the pokemon (null)
// 🐨 use React.useEffect where the callback should be called whenever the
// pokemon name changes.
// 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
// 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
// 🐨 before calling `fetchPokemon`, clear the current pokemon state by setting it to null.
// (This is to enable the loading state when switching between different pokemon.)
// 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:

// 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
//   1. no pokemonName: 'Submit a pokemon'
//   2. pokemonName but no pokemon: <PokemonInfoFallback name={pokemonName} />
//   3. pokemon: <PokemonDataView pokemon={pokemon} />
