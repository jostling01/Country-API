const logger = (req, res, next) => {
    console.log(req.method, req.originalUrl); // GET / countries - method refers to http request
    next() 
}

module.exports = logger