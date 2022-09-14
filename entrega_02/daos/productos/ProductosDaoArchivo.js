const ContenedorArchivo = require('../../contenedores/ContenedorArchivo')
const ruta = './database/productos.json'

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super(ruta)
    }

}

module.exports = ProductosDaoArchivo