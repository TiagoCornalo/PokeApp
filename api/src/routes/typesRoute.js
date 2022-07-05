const typesRouter = require('express').Router()
const { getTypes } = require('../controllers/types')

typesRouter.get('/api/types', getTypes)

module.exports = typesRouter
