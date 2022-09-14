const dotenv = require('dotenv').config() // 1
var admin = require("firebase-admin");
var serviceAccount = require("../firebase/backend-clase-20-firebase-adminsdk-ywa7k-48e0910906.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore()
console.log('Firestore Conectado');

class ContenedorFirebase {

    constructor(coll) {
        this.coll = coll
        this.query = db.collection('productos')
    }
    // save(Object) : Number

    async save(obj) {
        try {
            const doc = this.query.doc(`${obj.id}`)
            let item = await doc.create(obj);
            console.log('Objeto agregado correctamente');
            return item;

        } catch (error) {
            console.log(error);
        }
    }
    // ************************************************************************* //

    // getByID(Number) : Object

    async getById(id) {
        try {
            const doc = this.query.doc(`${id}`);
            const queryReadOne = await doc.get()
            const respuesta = { id: queryReadOne.id, ...queryReadOne.data() }

            if (respuesta) {
                console.log(respuesta)
                return respuesta
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
            const queryRead = await this.query.get()
            const data = queryRead.docs.map(document => ({id: document.id, ...document.data()}))
            if (data) {
                return data
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
                const doc = this.query.doc(`${id}`)
                const item = await doc.update(product)
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

module.exports = ContenedorFirebase
