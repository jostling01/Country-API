const { Router } = require('express') // loads the express library
const countryRouter = Router() // uses object destructuring to extract the Router function from the express module
const countryController = require('../controllers/countries') // imports the functions form the controller file

countryRouter.get('/', countryController.index) // maps a http request to a function in controllers
countryRouter.get('/:name', countryController.show)
countryRouter.post('/', countryController.create)
countryRouter.delete('/:name', countryController.destroy)
countryRouter.patch('/:name', countryController.update)

module.exports = countryRouter // exports the router so it can be used in app.js