const Products = require('../mongoDB/models/products.models') // 1

const dotenv = require('dotenv').config() // 1
const connectDB = require('../mongoDB/connection')  // 1
connectDB() // 1
class ContenedorMongoDb {

    // save(Object) : Number

    async save(obj) {
        try {

            let product = new Products(obj)
            await product.save()
            console.log('Objeto Agregado');
        } catch (error) {
            console.log(error);
        }
    }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let objeto = await Products.find({ id: id })

            if (objeto) {
                console.log(objeto)
                return objeto
            } else {
                console.log('El item no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

    // getAll() : Object[]

    async getAll() {
        try {
            let objetos = await Products.find()
            if (objetos) {
                return objetos
            } else {
                console.log('No hay Productos')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // updateById

    async updateById(id, product) {

        try {
            let timestamp = Date.now()
            if (this.getById(id)) {
                product.timestamp = timestamp
                await Products.updateOne({ id: id }, { $set: product })
                return { mensaje: 'Objeto actualizado' }
            } else {
                return { mensaje: 'Objeto no encontrado' }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // deleteById(Number) : void

    async deleteById(id) {
        try {
            if (this.getById(id)) {
                await Products.deleteOne({ id: id })
                console.log('Objeto Eliminado')
            } else {
                console.log('No se encontró el objeto')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // deleteAll() : void   (Ver)

    async deleteAll() {
        await Products.deleteMany()
        // await Products.deleteAll()
        console.log('Todos los objetos se han eliminado')
    }

}

module.exports = ContenedorMongoDb
