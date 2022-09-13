var admin = require("firebase-admin");

var serviceAccount = require("./backend-clase-20-firebase-adminsdk-ywa7k-48e0910906.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firestore Conectado');

const CRUD = async () => {
    const db = admin.firestore()
    query = db.collection('usuarios')

    // Create

    try {
        // ---------------- Create a User -------------------
        // let id = 2
        // const doc = query.doc(`${id}`)
        // await doc.create({
        //     nombre: 'Maria',
        //     apellido: 'Alvez',
        //     edad: 22,
        //     email: 'maria@gmail.com'
        // })
        // console.log('Usuario Creado');

        // ---------------- Update Users -------------------
        // const id = '2'
        // const doc = query.doc(id)
        // const item = await doc.update({
        //     nombre: 'Maria',
        //     edad: 30
        // })

        // ---------------- Delete Users -------------------
        // const id = '2'
        // const doc = query.doc(id)
        // const item = await doc.delete()
        // console.log(`Item Eliminado: ${item}`)

        // ---------------- Read Users -------------------
        // const queryRead = await query.get()
        // const respuesta = queryRead.docs.map(document => ({id: document.id, ...document.data()})) 
        // console.log(respuesta)

        // ---------------- Read One User -------------------
        const doc = query.doc('1')
        const queryReadOne = await doc.get()
        const respuesta = {id: queryReadOne.id, ...queryReadOne.data()}
        console.log(respuesta);

    } catch (error) {
        console.log(error)
    }
}

CRUD()

