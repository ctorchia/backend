// const fs = require('fs');

class HandlerDB {
    constructor(configKnex, tableName) {
        this.knex = configKnex
        this.tableName = tableName
    }

    // add(Object) : Number

    async add(obj) {
        try {
            await this.knex(this.tableName).insert(obj)  // Le podemos pasar un obj o un array
            return {message: 'Producto agregado'}    
        } catch (error) {
            console.log(error);
        }
    }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let item = await knex.from(this.tableName).select('*').where({id:id})
            return item
        } catch (error) {
            console.log(error);
        }
    }

    // getAll() : Object[]

    async getAll() {
        try {
            let items = await this.knex.from(this.tableName).select('*')
            return items
        } catch (error) {
            console.log(error);
        }
    }

    // updateById

    // async updateById(id, product) {
    //     product.id = id

    //     try {
    //         const products = await this.getAll()
    //         const index = products.findIndex(obj => obj.id === id)
    //         // console.log(index);
    //         if (index !== -1){
    //             products[index] = product
    //             await fs.promises.writeFile(this.ruta, JSON.stringify(products, null, 2))
    //             return {mensaje: 'Producto actualizado'}

    //         } else {
    //             return {mensaje: 'Producto no encontrado'}
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // deleteById(Number) : void

    // async deleteById(id) {
    //     try {
    //         let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
    //         let dataArchParse = JSON.parse(dataArch)
    //         let producto = dataArchParse.find(producto => producto.id === id)
    //         if (producto) {
    //             let dataArchParseFiltered = dataArchParse.filter(producto => producto.id !== id)
    //             await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltered, null, 2))
    //             console.log('Producto Eliminado')
    //         } else {
    //             console.log('No se encontró el producto')
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // deleteAll() : void

    // async deleteAll() {
    //     await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf8')
    //     console.log('Todos los productos se han eliminado')
    // }
}

module.exports = HandlerDB;