const Country = require('../models/Country')

async function index(req, res) {
    try {
        const countries = await Country.getAll() // calls the getAll function in Country class in model, and stores the instance object created in countries variable
        res.status(200).json(countries) // if resp is okay, sends a 200 status code and ensures the Country instance object is a javascript object before sending to client
    } catch(err) {
        res.status(500).json({error: err.message}) // if something goes wrong returns a 500 status code and a json object containing the error message
    }
}

async function show(req, res) {
    try{
        let name = req.params.name // isolating name from url
        const country = await Country.getOneCountryByName(name) // calls function in Country model, if successful, stores Country instance object in variable country
        res.status(200).json(country) // if promise resolved, returns status code 200 and the Country instance object (json is used for converting from json to js object but Country instance is already javascript object so this is just validation)
    } catch (err) {
        res.status(400).json({ error: err.message}) // if promise rejected, returns 400 status code and error message
    }
}

async function create(req, res) {
    try {
        const data = req.body
        const newCountry = await Country.create(data)
        res.status(201).json(newCountry)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

async function update (req, res) {
    try {
        const name = req.params.name;
        const country = await Country.getOneCountryByName(name);
        const data = req.body;
        const updatedCountry = await country.update(data);
        res.status(200).json(updatedCountry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
async function destroy(req, res) {
    try {
        const name = req.params.name
        const country = await Country.getOneCountryByName(name)
        const result = await country.destroy()
        res.status(200).end()
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

module.exports = { index, show, create, destroy, update }