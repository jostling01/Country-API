const logger = (req, res, next) => {
    console.log(req.method, req.originalURL); // GET / countries
    next() 
}

module.exports = logger