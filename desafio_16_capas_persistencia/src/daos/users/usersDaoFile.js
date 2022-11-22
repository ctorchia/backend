const ContainerFile = require('../../containers/containerMem');
const ruta = './database/productos.json'

class ProductosDaoFile extends ContainerFile {
    constructor(){
        super(ruta)
    }

}

module.exports = ProductosDaoFile