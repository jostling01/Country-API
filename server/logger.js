const logger = (req, res, next) => {
    console.log(req.method, req.originalUrl); // GET / countries - logs method / http request and url
    next() // passes control to the next middleware function in app.js
}

module.exports = logger