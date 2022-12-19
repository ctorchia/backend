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

// //********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

// const deleteCartById = async (req, res) => {
//     const { id } = req.params
//     await carrito.deleteById(parseInt(id))
// }

// //********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************

// const deleteProductFromCart = async (req, res) => {
//     const { idCart, idProduct } = req.params
//     await carrito.deleteProductById(idCart, idProduct)
// }

// //********************** POST: '/sendOrder' (Confirmar Compra) **********************************

// const postSendOrder = async (req, res) => {
//     const { idCart, username, email, phone } = req.body
//     const carritoById = await carrito.getById(parseInt(idCart))
//     listaProductos = carritoById.products

//     // Enviar correo por envio de orden
//     mailerSendOrder(listaProductos, username, email);
//     whatsappSendOrder(username, email);
//     smsSendOrder(phone)

//     res.json({ mensaje: "Compra confirmada", productos: listaProductos })
// }

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
    // deleteCartById,
    // deleteProductFromCart,
    // postSendOrder,
    // routeNotAvailable
}