// const { response } = require('express')
const { carritosDao } = require("../daos/index");
const {mailerSendOrder} = require('../mailer/mailer')
const {whatsappSendOrder} = require('../mailer/whatsapp')
const {smsSendOrder} = require('../mailer/sms')
const carrito = carritosDao

//********************** GET: '/:id/productos' (Listar todos los productos de un carrito) **********************************

const getProductsFromCart = async (ctx) => {
    const carritoById = await carrito.getById(ctx.request.params.id)
    listaProductos = carritoById.products
    ctx.body = listaProductos
}

//********************** POST: '/' (Crea un carrito y devuelve su ID) **********************************

const postCart = async (ctx) => {
    const idCarrito = await carrito.save(ctx.request.body)
    ctx.body = idCarrito
}

//********************** POST: '/:id/productos' (Incorporar productos al carrito) **********************************

const postProductToCart = async (ctx) => {
    carritoById = await carrito.addProductToCart(ctx.request.params.id, ctx.request.body)
    ctx.body = carritoById
}

//********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

const deleteCartById = async (ctx) => {
    await carrito.deleteById(ctx.request.params.id)
}

//********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************

const deleteProductFromCart = async (ctx) => {
    await carrito.deleteProductById(ctx.request.params.idCart, ctx.request.params.idProduct)
}

//********************** POST: '/sendOrder' (Confirmar Compra) **********************************

const postSendOrder = async (ctx) => {
    const { idCart, username, email, phone } = ctx.request.body
    const carritoById = await carrito.getById(parseInt(idCart))
    listaProductos = carritoById.products

    // Enviar correo por envio de orden
    mailerSendOrder(listaProductos, username, email);
    whatsappSendOrder(username, email);
    smsSendOrder(phone)

    ctx.body = { mensaje: "Compra confirmada", productos: listaProductos }
}

// //********************** '*' Rest of the routes **********************************

// const routeNotAvailable = async (req, res) => {
//     res.json({
//         error: -2,
//         description: "Ruta no implementada"
//     })
// }

module.exports = {
    getProductsFromCart,
    postCart,
    postProductToCart,
    deleteCartById,
    deleteProductFromCart,
    postSendOrder,
    // routeNotAvailable
}