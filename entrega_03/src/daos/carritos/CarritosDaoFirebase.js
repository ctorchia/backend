const ContenedorFirebase = require('../../contenedores/ContenedorFirebase')
let coll = 'carritos'

class CarritosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(coll)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            let carritoById = await this.getById(idCart)
            console.log(carritoById);
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
            console.log(error);
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
                console.log('Producto Eliminado 2')
            } else {
                console.log('No se encontró el Producto')
            }

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = CarritosDaoFirebase