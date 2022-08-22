const fs = require('fs');

class Carrito {
    constructor(ruta) {
        this.ruta = ruta
    }

    // save(Object) : Number

    async save(obj) {
        try {

            let dataArch = await fs.promises.readFile(this.ruta, 'utf8');
            let dataArchParse = JSON.parse(dataArch);
            if (dataArchParse.length) {

                await fs.promises.writeFile(this.ruta, JSON.stringify([...dataArchParse, { id: dataArchParse[dataArchParse.length - 1].id + 1,...obj}], null, 2))
                let idProduct = dataArchParse[dataArchParse.length - 1].id + 1
                console.log(`El carrito tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                await fs.promises.writeFile(this.ruta, JSON.stringify([{id: 1, ...obj }], null, 2))
                console.log(`El carrito tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            console.log(error);
        }
    }

        // addProductToCart(Number, Object) : Number (In Process)

        async addProductToCart(idCart, product) {
            try {
    
                const carritoById = await this.getById(parseInt(idCart))
                if (carritoById.products.length) {
                    let productToAdd = { id: carritoById.products[carritoById.products.length - 1].id + 1,...product}
                    carritoById.products.push(productToAdd)
                    console.log(carritoById.products);
                    await this.updateById(parseInt(idCart), carritoById)
                    let idProduct = carritoById.products[carritoById.products.length - 1].id
                    console.log(`El producto agregado tiene el ID: ${idProduct}`);
                    return idProduct;
    
                } else {
    
                    // await fs.promises.writeFile(this.ruta, JSON.stringify([{id: 1, ...obj }], null, 2))
                    console.log(`El producto agregado tiene el ID: 1`);
                    return 1;
    
                }
    
            } catch (error) {
                console.log(error);
            }
        }

    // getByID(Number) : Object

    async getById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)

            let carrito = dataArchParse.find(carrito => carrito.id === id)
            if (carrito) {
                console.log(carrito)
                return carrito
            } else {
                console.log('El carrito no existe');
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }

    // getAll() : Object[]

    async getAll() {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            if (dataArchParse.length) {
                // console.log(dataArchParse)
                return dataArchParse

            } else {
                console.log('No hay Carritos')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // updateById

    async updateById(id, carrito) {
        carrito.id = id

        try {
            const carritos = await this.getAll()
            const index = carritos.findIndex(obj => obj.id === id)
            // console.log(index);
            if (index !== -1){
                carritos[index] = carrito
                await fs.promises.writeFile(this.ruta, JSON.stringify(carritos, null, 2))
                return {mensaje: 'Carrito actualizado'}

            } else {
                return {mensaje: 'Carrito no encontrado'}
            }
        
        } catch (error) {
            console.log(error);
        }
    }

    // deleteById(Number) : void

    async deleteById(id) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let carrito = dataArchParse.find(carrito => carrito.id === id)
            if (carrito) {
                let dataArchParseFiltered = dataArchParse.filter(carrito => carrito.id !== id)
                await fs.promises.writeFile(this.ruta, JSON.stringify(dataArchParseFiltered, null, 2))
                console.log('Carrito Eliminado')
            } else {
                console.log('No se encontró el Carrito')
            }

        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(idCart, idProduct) {
        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let carrito = dataArchParse.find(carrito => carrito.id === idCart)
            let product = carrito.products.find(product => product.id === idProduct)
            console.log(product);
            if (product) {
                let productosFiltrados = carrito.products.filter(product => product.id !== idProduct)
                carrito.products = productosFiltrados
                this.updateById(idCart, carrito)
                console.log('Producto Eliminado')
            } else {
                console.log('No se encontró el Producto')
            }

        } catch (error) {
            console.log(error);
        }
    }

    // deleteAll() : void

    // async deleteAll() {
    //     await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2), 'utf8')
    //     console.log('Todos los productos se han eliminado')
    // }
}

module.exports = Carrito;