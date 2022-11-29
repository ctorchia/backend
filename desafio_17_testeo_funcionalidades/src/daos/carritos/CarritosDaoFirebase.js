const ContenedorFirebase = require('../../containers/ContenedorFirebase')
let coll = 'carritos'

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(coll)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            let carritoById = await this.getById(idCart)
            logger.info(carritoById);
            let timestamp = Date.now()
            if (carritoById) {
                carritoById.products.push(product)
                const doc = this.query.doc(`${idCart}`)
                const item = await doc.update(carritoById)
                return carritoById;

            } else {
                return [];
            }

        } catch (error) {
            logger.error(error);
        }
    }

    // deleteProductById(idCart, idProduct) 

    async deleteProductById(idCart, idProduct) {
        try {
            let carritoById = await this.getById(idCart)
            if (carritoById) {

                let productosFiltrados = carritoById.products.filter(product => product.id !== idProduct)
                carritoById.products = productosFiltrados
                await this.updateById(idCart, carritoById)
                logger.info('Producto Eliminado 2')
            } else {
                logger.info('No se encontró el Producto')
            }

        } catch (error) {
            logger.error(error);
        }
    }

}

module.exports = CarritosDaoFirebase