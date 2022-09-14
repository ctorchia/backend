const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb')
const Products = require('../../mongoDB/models/products.models') // 1
let prueba = 'texto'

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        console.log(Products);
        super(prueba,Products)
    }

    // Otras funciones diferentes

}

module.exports = ProductosDaoMongoDb