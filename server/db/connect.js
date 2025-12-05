const { Pool } = require('pg')
const db = new Pool({ // ! POOL = create an object from a blueprint, give a JSON object,
    connectionString: process.env.DB_URL,
})
module.exports = db