const { Pool } = require('pg');

const db = new Pool({ // creates new object from a 'blueprint' in the Pool class
    connectionString: process.env.DB_URL // just a json object, if you provide json then this deconstructs it into a javascript object
})

module.exports = db;