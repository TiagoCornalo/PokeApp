const { typesToDb } = require('./services.js')
const { Type } = require('../db.js')
const getTypes = async (req, res) => {
  try {
    await typesToDb()
    let types = await Type.findAll()
    // parse types to be an array of objects with name property
    types = types.map((type) => type.toJSON())
    // response with array of objects sending, the id and name from db
    const response = types.map((type) => {
      return {
        id: type.id,
        name: type.name
      }
    })
    res.send(response)
  } catch (error) {
    return console.log(error)
  }
}

module.exports = {
  getTypes
}
