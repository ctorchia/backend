const mongoose = require('mongoose')  // 2
const { mongoDbUrl } = require('../config')  // 2

let instance = null;

class ContenedorMongoDb {

    constructor(model) {
        this.model = model
        this.getInstance();  // 2
    }

    async getInstance() {
        if (instance) {
            console.log('MongoDB is already connected');
            return instance;
        }
        const url = mongoDbUrl
        instance = await mongoose.connect(url, {           // 2
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected');
        return instance;
    }

    // save(Object) : Number

    async save(obj) {
        try {
            let product = new this.model(obj)
            await product.save()
            console.log('Objeto Agregado');
        } catch (error) {
            console.log(error);
        }
    }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let objeto = await this.model.find({ id: id })

            if (objeto) {
                console.log(objeto)
                return objeto[0]
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
            let objetosC = await this.model.find({}, { "__v": 0 })
            // let objetos = await this.model.find()

            let objetos = objetosC.map(element => {
                return { ...element._doc, id: element._id.toString() }
            });

            if (objetos) {
                // console.log(objetos);
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
                await this.model.updateOne({ id: id }, { $set: product })
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
                await this.model.deleteOne({ id: id })
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
        await this.model.deleteMany()
        // await this.model.deleteAll()
        console.log('Todos los objetos se han eliminado')
    }

}

module.exports = ContenedorMongoDb
