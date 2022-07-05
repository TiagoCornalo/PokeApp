// eslint-disable-next-line no-unused-vars
const { Pokemon, Type } = require('../db.js')
const { getSinglePokemon, pokemonToDb, getAllPokemons, dbInfo } = require('./services.js')

// bring a list of pokemons from the api, if i receive a name by query it will search for it
const getPokemon = async (req, res) => {
  try {
    const { name } = req.query
    const pokemon = await getAllPokemons()

    if (pokemon && name) {
      const pokemonFound = await pokemon.find((p) => p.name === name)
      return pokemonFound ? res.send(pokemonFound) : res.status(404).send('Pokemon not found')
    }
    res.status(200).json(pokemon)
  } catch (error) {
    return res.status(400).send({ message: error })
  }
}

const singlePokemon = async (req, res) => {
  try {
    const { id } = req.params
    if (id.length <= 3) {
      const found = await getSinglePokemon(id)
      return res.send(found)
    }
    const dbPokemon = await dbInfo()
    const singlePokemon = dbPokemon.find((poke) => poke.id === id)

    if (!singlePokemon) {
      return res.status(404).send('Pokemon not found')
    }
    return res.send(singlePokemon)
  } catch (error) {
    console.log(error)
  }
}

const postPokemon = async (req, res) => {
  try {
    const foundOrCreated = await pokemonToDb(req.body)
    if (!foundOrCreated) {
      return res.status(400).send({ message: 'Pokemon already exists' })
    }
    return res.status(201).send({ message: 'Pokemon created' })
  } catch (error) {
    console.log(error)
  }
}
const deletePokemon = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Pokemon.destroy({ where: { id } })
    if (!deleted) {
      return res.status(404).send('Pokemon not found')
    }
    return res.status(200).send({ message: 'Pokemon deleted' })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getPokemon,
  singlePokemon,
  postPokemon,
  deletePokemon
}
