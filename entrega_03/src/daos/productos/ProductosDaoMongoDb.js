const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb')
const Products = require('../../mongoDB/models/products.models') // 1

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Products)
    }

    // Otras funciones diferentes

}

module.exports = ProductosDaoMongoDb