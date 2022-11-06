// ------------ MongoDb ------------ //
const MONGODB_CONNECTION = 'mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority'

// module.exports = {MONGODB_CONNECTION}

// ##########################################################  //
// Agregado desde proyecto de Dasafios
// ##########################################################  //

require('dotenv').config()
const parseArgs = require('minimist')

// ----------- Enviroment ----------- //
let config = {
    mongoUser : process.env.MONGO_USER,
    mongoPass : process.env.MONGO_PASS,
    sessionSecret : process.env.SESSION_SECRET,
}

console.log(config);

// ------------- Arguments Info -------------------- //
const args = process.argv.slice(2)

const options = {
    alias: { p:'port', m:'mode'},
    default: { port: 8080, mode: 'FORK'}
}

let arguments = parseArgs(args, options)

console.log(arguments);

// ------------ MongoDb ------------ //
const mongoDbUrl = 'mongodb+srv://'+config.mongoUser+':'+config.mongoPass+'@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority'

console.log('MongoDb Url: ', mongoDbUrl);


module.exports = {
    mongoDbUrl,
    config,
    arguments,
    MONGODB_CONNECTION}