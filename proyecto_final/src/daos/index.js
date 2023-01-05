const dotenv = require('dotenv').config() // 1

let productosDao
let carritosDao
let messagesDao
let ordersDao

switch (process.env.TECH) {
    case 'file':
        const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo')
        const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo')
        const MessagesDaoFile = require('./messages/MessagesDaoFile')
        const OrdersDaoFile = require('./orders/OrdersDaoFile')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        messagesDao = new MessagesDaoFile()
        ordersDao = new OrdersDaoFile()
        break

    case 'mongoDb':
        const ProductosDaoMongoDb = require('./productos/ProductosDaoMongoDb')
        const CarritosDaoMongoDb = require('./carritos/CarritosDaoMongoDb')
        const MessagesDaoMongoDb = require('./messages/MessagesDaoMongoDb')
        const OrdersDaoMongoDb = require('./orders/OrdersDaoMongoDb')
        
        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        messagesDao = new MessagesDaoMongoDb()
        ordersDao = new OrdersDaoMongoDb()
        break
}

module.exports = {productosDao, carritosDao, messagesDao, ordersDao}