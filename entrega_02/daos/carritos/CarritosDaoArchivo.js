const ContenedorArchivo = require('../../contenedores/ContenedorArchivo.js')

class CarritosDaoArchivo extends ContenedorArchivo {
    // constructor() {
    //     super('../../database/carritos.json')
    // }

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
                console.log(`El producto agregado tiene el ID: ${idProduct}`);
                return idProduct;

            } else {

                let productToAdd = { id: 1, timestamp, ...product }
                carritoById.products.push(productToAdd)
                await this.updateById(parseInt(idCart), carritoById)

                console.log(`El producto agregado tiene el ID: 1`);
                return 1;

            }

        } catch (error) {
            console.log(error);
        }
    }

    // deleteProductById(idCart, idProduct) 

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

}

module.exports = CarritosDaoArchivo