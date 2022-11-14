const dotenv = require('dotenv').config() // 1

let usersDao
let messagesDao

switch (process.env.TECH) {
    // case 'file':
    //     const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo')
    //     const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo')

    //     productosDao = new ProductosDaoArchivo()
    //     carritosDao = new CarritosDaoArchivo()
    //     break
    case 'mongoDb':
        const usersDaoMongoDb = require('./users/usersDaoMongo')
        const messagesDaoMongoDb = require('./messages/messagesDaoMongo')

        usersDao = new usersDaoMongoDb()
        messagesDao = new messagesDaoMongoDb()
        break
    // case 'firebase':
    //     const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase')
    //     const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase')

    //     productosDao = new ProductosDaoFirebase()
    //     carritosDao = new CarritosDaoFirebase()
    //     break
}

module.exports = {usersDao, messagesDao}