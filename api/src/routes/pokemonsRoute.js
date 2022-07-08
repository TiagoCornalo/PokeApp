const pokemonRouter = require('express').Router()
const { getPokemon, singlePokemon, postPokemon, deletePokemon } = require('../controllers/pokemons')

pokemonRouter.get('/pokemons', getPokemon)

pokemonRouter.get('/pokemons/:id', singlePokemon)

pokemonRouter.post('/pokemons', postPokemon)

pokemonRouter.delete('/pokemons/:id', deletePokemon)
 
module.exports = pokemonRouter
