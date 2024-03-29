const ContenedorArchivo = require('../../containers/ContenedorArchivo.js.js')
const ruta = './database/carritos.json'
const fs = require('fs');


class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super(ruta)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            const carritoById = await this.getById(parseInt(idCart))
            let timestamp = Date.now()
            if (carritoById.products.length) {

                let productToAdd = { id: carritoById.products[carritoById.products.length - 1].id + 1, timestamp, ...product }
                carritoById.products.push(productToAdd)
                await this.updateById(parseInt(idCart), carritoById)
                let idProduct = carritoById.products[carritoById.products.length - 1].id
                logger.info(`El producto agregado tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                let productToAdd = { id: 1, timestamp, ...product }
                carritoById.products.push(productToAdd)
                await this.updateById(parseInt(idCart), carritoById)

                logger.info(`El producto agregado tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            logger.error(error);
        }
    }

    // deleteProductById(idCart, idProduct) 

    async deleteProductById(idCart, idProduct) {
        idCart = parseInt(idCart)
        idProduct = parseInt(idProduct);

        try {
            let dataArch = await fs.promises.readFile(this.ruta, 'utf8')
            let dataArchParse = JSON.parse(dataArch)
            let carrito = dataArchParse.find(carrito => carrito.id === idCart)
            let product = carrito.products.find(product => product.id === idProduct)
            logger.info(product);
            if (product) {
                let productosFiltrados = carrito.products.filter(product => product.id !== idProduct)
                carrito.products = productosFiltrados
                this.updateById(idCart, carrito)
                logger.info('Producto Eliminado')
            } else {
                logger.info('No se encontró el Producto')
            }

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = CarritosDaoArchivo