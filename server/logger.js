const logger = (req, res, next) => {
    console.log(req.method, req.originalUrl); // GET / countries - logs method / http request and url
    next() // passes control to the next middleware function in app
}

module.exports = logger

// req - the incoming object containing info about incmoming http request
// res - 