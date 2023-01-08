const ContainerFile = require('../../containers/containerFile');
const route = './database/carritos.json'
const fs = require('fs');


class CartsDaoFile extends ContainerFile {
    constructor(){
        super(route)
    }
}

module.exports = CartsDaoFile