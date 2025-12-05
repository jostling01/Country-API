const { Router } = require('express')
const countryRouter = Router()
const countryController = require('../controllers/countries')

countryRouter.get('/', countryController.index) // maps a http request to a function in controllers
countryRouter.get('/:name', countryController.show)
countryRouter.post('/', countryController.create)
countryRouter.delete('/:name', countryController.destroy)

module.exports = countryRouter