const fs = require('fs');

class Producto {
    constructor(ruta) {
        this.ruta = ruta
    }

    async save(obj) {
        try {

            let dataArch = await fs.promises.readFile(this.ruta, 'utf8');
            let dataArchParse = JSON.parse(dataArch);
            if (dataArchParse.length) {

                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { ...obj, id: dataArchParse.length + 1 }], null, 2))

            } else {

                await fs.promises.writeFile(this.ruta, JSON.stringify([{ ...obj, id: dataArchParse.length + 1 }], null, 2))

            }
            console.log(`El producto tiene el ID: ${dataArchParse.length + 1}`);
            return dataArchParse.length + 1;

        } catch (error) {
            console.log(error);
        }
    }

    // GetByID

    async getById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                console.log(producto)
                return producto
            } else {
                console.log('El producto no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

    //GetAllProducts

    async getAll() {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                console.log(dataArchParse)
                return dataArchParse

            } else {
                console.log('No hay Productos')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // DeleteById

    async deleteById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let producto = dataArchParse.find(producto => producto.id === id)
            if (producto) {
                let dataArchParseFiltered = dataArchParse.filter(producto => producto.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltered, null, 2))
                console.log('Producto Eliminado')

            } else {
                console.log('No se encontró el producto')
            }

        } catch (error) {
            console.log(error);

        }
    }
}

module.exports = Producto;