const logger = (req, res, next) => {
    console.log(req.method, req.originalUrl); // GET / countries
    next() 
}

module.exports = logger