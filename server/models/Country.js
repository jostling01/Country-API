const db = require('../db/connect')

class Country {
    constructor({country_id, name, capital, population, languages, fun_fact, map_image_url}) { // .this refers to the country/object that is calling the function
        this.country_id = country_id
        this.name = name
        this.capital = capital
        this.population = population
        this.languages = languages
        this.fun_fact = fun_fact
        this.map_image_url = map_image_url
    }

    static async getAll() {
        const response = await db.query('SELECT name, capital FROM country;'); // db.query sends an SQL query to the database and aks the database to return the name and capital of every row in country table, storing result in response variable
        if (response.rows.length === 0) { // checks if the db.query returned zero rows, i.e., the table was empty
            throw new Error('No countries available')
        }
        return response.rows.map(c => new Country(c)) // response.rows is an array of objects returned from the database, this line passes each row(object) in the array through the Country constructor, converting it into a Country instance
    }

    static async getOneCountryByName(countryName) {
        const response = await db.query('SELECT name, capital FROM country WHERE LOWER(name) = LOWER($1);', [countryName]) 
        if (response.rows.length != 1) {
            throw new Error(`Unable to find ${countryName}`) // if rows returned by query are not exactly 1, throws error including countryName
        }
        return new Country(response.rows[0]) // Takes the first (and only) row from response.rows[0], Creates a new instance of the Country class, passing that row (which should contain name and capital) to the constructor.
    }

    // db.query(...) sends a SQL query to the database to select the name and capital columns from the country table.
    // $1 is a parameter placeholder; [countryName] is the array of actual values, which helps prevent SQL injection.
    // The result is stored in response, which typically has a rows array.

    static async create(data) {
        const { name, capital, population, languages } = data // Uses object destructuring to pull name, capital, population, and languages out of the data object. After this line, you can use those four variables directly instead of data.name, data.capital, etc.
        const existingCountry = await db.query('SELECT name FROM country WHERE LOWER(name) = LOWER($1)', [name]) // Sends a SQL query to the database asking for any row in the  country  table whose  name  (case-insensitive) matches the provided  name . LOWER(name) = LOWER($1)  makes the check case-insensitive, and  name  is the parameter array used for the placeholder  $1 .
        if(existingCountry.rows.length === 0) { // checks that the exisitng country does not exist, i.e., the query should return no rows if the country doesn't exist in the database
            let response = await db.query('INSERT INTO country (name, capital, population, languages) VALUES ($1, $2, $3, $4) RETURNING *', [name, capital, population, languages]) // Runs an  INSERT  statement that adds a new row into the  country  table with the given  name ,  capital ,  population , and  languages . RETURNING *  makes the database send back the newly inserted row.
            return new Country(response.rows[0]) // Takes the first (and only) returned row from the insert,  response.rows , and uses it to construct a new  Country  instance. Returns that  Country  instance to controller
        } else {
            throw new Error('A country with this name already exists') // if exisitngCountry query returns any rows, return an error
        }
    }

    async destroy() {
        let response = await db.query('DELETE FROM country WHERE name = $1 RETURNING *;', [this.name])
        return new Country(response.rows[0])
    }
    // Calls the database with a  DELETE  SQL query that removes rows from the  country  table where  name  equals the current instance’s  name  ( this.name ).
	// $1  is a placeholder, and  this.name  provides the actual value, which helps prevent SQL injection.
	// RETURNING *  tells the database to send back the deleted row, and  await  pauses until the query finishes, storing the result in  response .

    async update(data) {
        const response = await db.query('UPDATE country SET capital = $1 WHERE name = $2 RETURNING name, capital;',
            [ data.capital, this.name ]); // capital = $1 will be replaced with data.capital, and name = $2 will be replaced with this.name (the name of the current Country instance). RETURNING name, capital tells the database to return the updated row’s name and capital after the update.
        if (response.rows.length != 1) {
            throw new Error('Unable to update capital.') // Checks that exactly one row was updated and returned. If no row (or more than one row) came back, something is wrong (for example, the country name did not exist), so it throws an error.
        }
        return new Country(response.rows[0]); // Takes the single returned row (response.rows[0], which has name and capital) and passes it into the Country constructor. Returns a new Country instance representing the updated country, which your controller then sends back in the HTTP response.
    }
}

module.exports = Country