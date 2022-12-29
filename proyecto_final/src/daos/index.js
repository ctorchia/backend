const dotenv = require('dotenv').config() // 1

let productosDao
let carritosDao
let messagesDao

switch (process.env.TECH) {
    case 'file':
        const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo')
        const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo')
        const MessagesDaoFile = require('./messages/MessagesDaoFile')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        messagesDao = new MessagesDaoFile()
        break
    case 'mongoDb':
        const ProductosDaoMongoDb = require('./productos/ProductosDaoMongoDb')
        const CarritosDaoMongoDb = require('./carritos/CarritosDaoMongoDb')
        const MessagesDaoMongoDb = require('./messages/MessagesDaoMongoDb')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        messagesDao = new MessagesDaoMongoDb()
        break
}

module.exports = {productosDao, carritosDao, messagesDao}