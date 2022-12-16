const ContenedorFirebase = require('../../containers/ContenedorFirebase')
let coll = 'productos'

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super(coll)
    }

    // Otras funciones diferentes

}

module.exports = ProductosDaoFirebase