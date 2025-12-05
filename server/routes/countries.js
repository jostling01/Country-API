const { Router } = require('express')
const countryRouter = Router()
const countryController = require('../controllers/countries')

countryRouter.get('/', countryController.index)

module.exports = countryRouter