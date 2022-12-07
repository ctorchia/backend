const express = require('express')
const {getProductsFromCart,postCart,postProductToCart,deleteCartById,deleteProductFromCart,routeNotAvailable,postSendOrder} = require('../controllers/carts.controller')

const { Router } = express
const routerCarrito = Router()

//********************** GET: '/:id/productos' (Listar todos los productos de un carrito) **********************************

routerCarrito.get('/:id/productos', getProductsFromCart)

//********************** POST: '/' (Crea un carrito y devuelve su ID) **********************************

routerCarrito.post('/', postCart)

//********************** POST: '/:id/productos' (Incorporar productos al carrito) **********************************

routerCarrito.post('/:id/productos', postProductToCart)

//********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

routerCarrito.delete('/:id', deleteCartById)

//********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************

routerCarrito.delete('/:idCart/productos/:idProduct', deleteProductFromCart)

//********************** POST: '/sendOrder' (Confirmar Compra) **********************************

routerCarrito.post('/sendOrder', postSendOrder)

//********************** '*' Rest of the routes **********************************

routerCarrito.get('*', routeNotAvailable)

module.exports = routerCarrito

