const { Pokemon, Type } = require('../db.js')
const { Op } = require('sequelize')
const axios = require('axios')

// bring a list of pokemons from the api
const notFoundImage = 'https://media3.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif?cid=ecf05e474q0fc9w79z3nhxyomc8zm7vi14pd6q7nmad7wq5s&rid=giphy.gif&ct=g'

const fetchApiData = async (url) => {
  try {
    // request the api url and get the data, then map the data to an array of links,pass the array to an axios.all to request all the links at once
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50')
    const promise = response.data.results.map(async (pokemon) => axios.get(pokemon.url))
    const results = await axios.all(promise)
    const pokemon = results.map((p) => {
      return {
        id: p.data.id,
        name: p.data.name,
        height: p.data.height,
        hp: p.data.stats[0].base_stat,
        attack: p.data.stats[1].base_stat,
        defense: p.data.stats[2].base_stat,
        speed: p.data.stats[5].base_stat,
        weight: p.data.weight,
        types: p.data.types.map((e) => e.type.name),
        img: p.data.sprites.versions['generation-v']['black-white'].animated
          .front_default,
        backImg:
          p.data.sprites.versions['generation-v']['black-white'].animated
            .back_default
      }
    })
    return pokemon
  } catch (error) {
    console.log(error)
  }
}

const getAllPokemons = async () => {
  try {
    const apiData = await fetchApiData()
    const dbData = await Pokemon.findAll({
      where: {},
      include: {
        model: Type,
        attributes: ['name']
      }
    })
    const dbDataTypes = await dbData.map((pokemon) => {
      return {
        id: pokemon.dataValues.id,
        name: pokemon.dataValues.name,
        height: pokemon.dataValues.height,
        hp: pokemon.dataValues.hp,
        attack: pokemon.dataValues.attack,
        defense: pokemon.dataValues.defense,
        speed: pokemon.dataValues.speed,
        weight: pokemon.dataValues.weight,
        types: pokemon.dataValues.types.map((e) => e.dataValues.name),
        img: pokemon.dataValues.img
      }
    })
    return [...apiData, ...dbDataTypes]
  } catch (error) {
    console.log(error)
  }
}

// search for a pokemon by id

const getSinglePokemon = async (id) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon = {
      id: response.data.id,
      name: response.data.name,
      height: response.data.height,
      hp: response.data.stats[0].base_stat,
      attack: response.data.stats[1].base_stat,
      defense: response.data.stats[2].base_stat,
      speed: response.data.stats[5].base_stat,
      weight: response.data.weight,
      types: response.data.types.map((e) => e.type.name),
      img: response.data.sprites.versions['generation-v']['black-white'].animated
        .front_default,
      backImg: response.data.sprites.versions['generation-v']['black-white'].animated
        .back_default
    }
    return pokemon
  } catch (error) {
    console.log(error)
  }
}
/* DB SERVICES */
// get all pokemons from db, map them an return it to the frontend
const dbInfo = async () => {
  try {
    const pokemonsDb = await Pokemon.findAll({
      where: {},
      include: {
        model: Type,
        attributes: ['name']
      }
    })
    const mappedPokemons = pokemonsDb.map((poke) => {
      return {
        id: poke.dataValues.id,
        name: poke.dataValues.name,
        height: poke.dataValues.height,
        hp: poke.dataValues.hp,
        attack: poke.dataValues.attack,
        defense: poke.dataValues.defense,
        speed: poke.dataValues.speed,
        weight: poke.dataValues.weight,
        types: poke.dataValues.types.map((e) => e.dataValues.name),
        img: poke.dataValues.img
      }
    })
    return mappedPokemons
  } catch (error) {
    console.log(error)
  }
}

const pokemonToDb = async (data) => {
  try {
    const { name, height, hp, attack, defense, speed, weight, types, img } = data

    const [pokemon, created] = await Pokemon.findOrCreate({
      where: { name },
      defaults: {
        height,
        hp,
        attack,
        defense,
        speed,
        weight,
        img: img || notFoundImage
      }
    })
    if (created) {
      const foundTypes = await Type.findAll({
        where: {
          name: {
            [Op.in]: types
          }
        }
      })
      await pokemon.addTypes(foundTypes)
      return pokemon
    }
  } catch (error) {
    console.log(error)
  }
}

const typesToDb = async () => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type')
    const types = response.data.results.map((type) => { return { name: type.name } })

    const typesFromDb = await Type.findAll()
    if (typesFromDb.length === 0) {
      await Type.bulkCreate(types)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  fetchApiData,
  getSinglePokemon,
  pokemonToDb,
  typesToDb,
  getAllPokemons,
  dbInfo
}
