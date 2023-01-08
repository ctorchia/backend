const ContenedorMongoDb = require('../../containers/containerMongoDb')
const Carts = require('../../mongoDB/models/carts.models') // 1

class CarritosDaoMongoDb extends ContenedorMongoDb {
    constructor() {
        super(Carts)
    }

    // addProductToCart(Number, Object) : Number (In Process)

    async addProductToCart(idCart, product) {
        try {

            let carritoById = (await this.getById(idCart))
            let timestamp = Date.now()
            if (carritoById) {
                carritoById.products.push(product)

                await this.model.updateOne(
                    { id: idCart },
                    { $set: { products: carritoById.products } }
                )
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
            let cart = await this.getById(idCart)
            
            logger.info(`Carrito Seleccionado: ${cart}`);
            logger.info(`Productos: ${cart.products}`);
            if (cart) {

                let productosFiltrados = cart.products.filter(product => product._id !== idProduct)
                cart.products = productosFiltrados
                console.log(cart.products);
                await this.updateById(idCart, cart)
                logger.info('Producto Eliminado')
            } else {
                logger.info('No se encontró el Producto')
            }

        } catch (error) {
            logger.error(error);
        }
    }

    async getByEmail(email){
        try {
            let cart = await this.model.find({email: email})
            if(cart){
                return cart[0]
            }else{
                return null
            }
        } catch (error) {
            logger.error(error)
        }
    }

}

module.exports = CarritosDaoMongoDb