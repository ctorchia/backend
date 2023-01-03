const ContenedorMongoDb = require('../../containers/containerMongoDb')
const Products = require('../../mongoDB/models/products.models') // 1

class ProductosDaoMongoDb extends ContenedorMongoDb {
    constructor(){
        super(Products)
    }

    async getProductByCategory(category) {
        try {
            const listaProductos = await this.getAll()
            let productosFiltrados = listaProductos.filter(producto => producto.category == category)
            return productosFiltrados

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = ProductosDaoMongoDb