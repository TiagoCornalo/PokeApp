import axios from 'axios'
export const GET_POKEMONS = 'GET_POKEMONS'
export const GET_POKEMON_DETAILS = 'GET_POKEMON_DETAILS'
export const GET_TYPES = 'GET_TYPES'
export const ADD_POKEMON = 'ADD_POKEMON'
export const SEARCH_POKEMON = 'SEARCH_POKEMON'
export const FILTER_POKEMON = 'FILTER_POKEMON'
export const SORT_POKEMON = 'SORT_POKEMON'
export const TYPES_FILTER = 'TYPES_FILTER'
export const SET_IMAGE = 'SET_IMAGE'
export const NOT_FOUND_CLEANUP = 'NOT_FOUND_CLEANUP'

export const getPokemons = () => {
  return function (dispatch) {
    fetch('/api/pokemons ')
      .then(response => response.json())
      .then(pokemons => {
        dispatch({
          type: GET_POKEMONS,
          payload: pokemons
        })
      })
  }
}
export const getSinglePokemon = (id) => {
  return function (dispatch) {
    fetch(`/api/pokemons/${id}`)
      .then(response => response.json())
      .then(pokemon => {
        dispatch({
          type: GET_POKEMON_DETAILS,
          payload: pokemon
        })
      })
  }
}

export const getTypes = () => {
  return function (dispatch) {
    fetch('/api/types')
      .then(response => response.json())
      .then(types => {
        dispatch({
          type: GET_TYPES,
          payload: types
        })
      })
  }
}

export const postPokemon = (data) => {
  return async function (dispatch) {
    await axios.post('/api/pokemons', data)
      .then(dispatch({ type: ADD_POKEMON }))
      .then(() => {
        alert('Pokemon added')
      })
  }
}

export const deletePokemon = (id) => {
  return async function () {
    await axios.delete(`/api/pokemons/${id}`)
  }
}
/* FILTERS & SORT // */
export const searchPokemon = (search) => {
  return {
    type: 'SEARCH_POKEMON',
    payload: search
  }
}

export const sortPokemon = (sortCondition) => {
  return {
    type: 'SORT_POKEMON',
    payload: sortCondition
  }
}

export const filterPokemon = (filterCondition) => {
  return {
    type: 'FILTER_POKEMON',
    payload: filterCondition
  }
}
export const typesFilter = (type, origin) => {
  return {
    type: 'TYPES_FILTER',
    payload: { type, origin }
  }
}
/* Details  */

export const detailCleanup = () => {
  return {
    type: GET_POKEMON_DETAILS,
    payload: []
  }
}
/* set pokedex image */

export const setImage = (image) => {
  return {
    type: SET_IMAGE,
    payload: image
  }
}
/* not found cleanup */

export const notFoundCleanup = () => {
  return {
    type: 'NOT_FOUND_CLEANUP'
  }
}
