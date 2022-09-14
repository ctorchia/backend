const dotenv = require('dotenv').config() // 1

let productosDao
let carritosDao

switch (process.env.TECH) {
    case 'file':
        const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo')
        const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo')

        productosDao = new ProductosDaoArchivo()
        carritosDao = new CarritosDaoArchivo()
        break
    case 'mongoDb':
        const ProductosDaoMongoDb = require('./productos/ProductosDaoMongoDb')
        const CarritosDaoMongoDb = require('./carritos/CarritosDaoMongoDb')

        productosDao = new ProductosDaoMongoDb()
        carritosDao = new CarritosDaoMongoDb()
        break
    case 'firebase':
        const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase')
        const CarritosDaoFirebase = require('./carritos/CarritosDaoFirebase')

        productosDao = new ProductosDaoFirebase()
        carritosDao = new CarritosDaoFirebase()
        break
}

module.exports = {productosDao, carritosDao}