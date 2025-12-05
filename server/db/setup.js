require('dotenv').config()
const fs = require('fs')
const db = require('./connect')
const sql = fs.readFileSync('./server/db/countries.sql').toString()
db.query(sql) // ! created an object called sql, connect to database and run script
    .then((data) => {
        db.end() // ! When its finished end and clg
        console.log('Setup Complete');
    })
    .catch((error) => console.log(error));