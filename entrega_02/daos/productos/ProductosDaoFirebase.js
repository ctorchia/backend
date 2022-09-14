const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')
const collection = 'productos'
class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super(collection)
    }

    // Otras funciones diferentes

}

module.exports = ProductosDaoFirebase