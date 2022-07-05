const pokemonRouter = require('express').Router()
const { getPokemon, singlePokemon, postPokemon, deletePokemon } = require('../controllers/pokemons')

pokemonRouter.get('/api/pokemons', getPokemon)

pokemonRouter.get('/api/pokemons/:id', singlePokemon)

pokemonRouter.post('/api/pokemons', postPokemon)

pokemonRouter.delete('/api/pokemons/:id', deletePokemon)

module.exports = pokemonRouter
