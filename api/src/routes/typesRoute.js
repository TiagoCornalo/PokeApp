const typesRouter = require('express').Router()
const { getTypes } = require('../controllers/types')

typesRouter.get('/types', getTypes)

module.exports = typesRouter
