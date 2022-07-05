import {
  sortPokemon,
  filterPokemon,
  filterByType
} from './utils'

import {
  GET_POKEMONS,
  GET_POKEMON_DETAILS,
  GET_TYPES, ADD_POKEMON,
  SEARCH_POKEMON,
  FILTER_POKEMON,
  SORT_POKEMON,
  TYPES_FILTER,
  SET_IMAGE,
  NOT_FOUND_CLEANUP
} from '../actions'

const initialState = {
  pokemons: [],
  pokemonsCopy: [],
  pokemonDetails: [],
  existingPokemons: [],
  createdPokemons: [],
  types: [],
  pokedexImg: ''
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        pokemonsCopy: action.payload,
        existingPokemons: filterPokemon('Existing', action.payload),
        createdPokemons: filterPokemon('Created', action.payload)
      }
    case GET_POKEMON_DETAILS:
      return { ...state, pokemonDetails: action.payload }
    case GET_TYPES:
      return { ...state, types: action.payload }
    case ADD_POKEMON:
      return { ...state }
    case SEARCH_POKEMON:
      return { ...state, pokemonsCopy: state.pokemons.filter((poke) => poke.name.toLowerCase().includes(action.payload.toLowerCase())) }
    case NOT_FOUND_CLEANUP:
      return { ...state, pokemonsCopy: state.pokemons }
    case SORT_POKEMON:
      return { ...state, pokemonsCopy: sortPokemon(action.payload, state.pokemonsCopy) }
    case FILTER_POKEMON:
      return { ...state, pokemonsCopy: filterPokemon(action.payload, state.pokemons) }
    case TYPES_FILTER:
      return {
        ...state,
        pokemonsCopy:
      filterByType(action.payload.type,

        action.payload.origin === 'Existing'
          ? state.existingPokemons

          : action.payload.origin === 'Created'
            ? state.createdPokemons
            : state.pokemons
      )
      }
    case SET_IMAGE:
      return { ...state, pokedexImg: `${action.payload}` }
    default:
      return state
  }
}

export default rootReducer
