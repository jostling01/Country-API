const express = require('express')
const cors = require('cors')
const logger = require('./logger')
const countryRouter = require('./routes/countries')

const app = express()
app.use(cors())
app.use(logger)
app.use('', countryRouter)

module.exports = app