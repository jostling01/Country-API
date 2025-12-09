const express = require('express') 
const cors = require('cors')
const logger = require('./logger')
const countryRouter = require('./routes/countries') // define router to router file

const app = express() // triggers use of express library
app.use(cors()) // allows requests from differnet origins, e.g., ports or local
app.use(logger) // calls logger function
app.use(express.json()) // enables app to convert http request from json into format our program can read
app.use('/countries', countryRouter) // mounts the router to the path

module.exports = app