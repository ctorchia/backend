
require('dotenv').config()
// const parseArgs = require('minimist')

// ----------- Enviroment ----------- //
let config = {
    mongoUser : process.env.MONGO_USER,
    mongoPass : process.env.MONGO_PASS,
    sessionSecret : process.env.SESSION_SECRET,
    sessionTime: process.env.SESSION_TIME,
}

// ------------- Arguments Info -------------------- //
// const args = process.argv.slice(2)

// const options = {
//     alias: { p:'port', m:'mode'},
//     default: { port: 8080, mode: 'FORK'}
// }

// let arguments = parseArgs(args, options)

// ------------ MongoDb ------------ //
let mongoDbUrl = ""
if (process.env.NODE_ENV === 'production') {
    mongoDbUrl = 'mongodb+srv://'+config.mongoUser+':'+config.mongoPass+'@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority'
} else {
    mongoDbUrl = 'mongodb://localhost:27017/ecommerce'   
}

module.exports = {
    mongoDbUrl,
    config,
    arguments
}