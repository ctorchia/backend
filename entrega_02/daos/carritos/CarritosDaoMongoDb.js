const ContenedorMongoDb = require('../../contenedores/ContenedorMongoDb')
const Carts = require('../../mongoDB/models/carts.models') // 1

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(Carts)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            let carritoById = (await this.getById(parseInt(idCart)))[0]
            let timestamp = Date.now()
            console.log(carritoById);
            if (carritoById) {
                carritoById.products.push(product)
                console.log(carritoById.products);

                await this.model.updateOne(
                    { id: idCart },
                    { $set: { products: carritoById.products } }
                )
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
            let cart = (await this.getById(idCart))[0]
            
            console.log(`Carrito Seleccionado: ${cart}`);
            console.log(`Productos: ${cart.products}`);
            if (cart) {

                let productosFiltrados = cart.products.filter(product => product.id !== idProduct)
                cart.products = productosFiltrados
                await this.updateById(idCart, cart)
                console.log('Producto Eliminado')
            } else {
                console.log('No se encontró el Producto')
            }

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = CarritosDaoMongoDb