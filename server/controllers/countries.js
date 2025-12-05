const Country = require('../models/Country')

async function index(req, res) {
    try {
        const countries = await Country.getAll()
        res.status(200).json(countries)
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

module.exports = { index }