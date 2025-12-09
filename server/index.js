require('dotenv').config()
const app = require('./app')

const port = process.env.PORT
app.listen(port , () => {
    console.log(`Server listening on port ${port}`);
}) // index file is basically used to start the server/API