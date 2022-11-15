const ContainerFile = require('../../containers/containerMem');
const ruta = './database/carritos.json'
const fs = require('fs');


class CarritosDaoFile extends ContainerFile {
    constructor(){
        super(ruta)
    }
}

module.exports = CarritosDaoFile