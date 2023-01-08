const { response } = require('express')
const { carritosDao } = require("../daos/index");
// const {mailerSendOrder} = require('../mailer/mailer')
// const {whatsappSendOrder} = require('../mailer/whatsapp')
// const {smsSendOrder} = require('../mailer/sms')
const carrito = carritosDao

//********************** GET: '/:id/productos' (Listar todos los productos de un carrito) **********************************

const getProductsFromCart = async (req, res) => {
    const { id } = req.params
    const carritoById = await carrito.getById(id)
    listaProductos = carritoById.products
    res.json(listaProductos)
}

//********************** POST: '/' (Crea un carrito y devuelve su ID) **********************************

const postCart = async (req, res) => {
    const idCarrito = await carrito.save(req.body)
    res.json(idCarrito)
}

//********************** POST: '/:id/productos' (Incorporar productos al carrito) **********************************

const postProductToCart = async (req, res) => {
    const { id } = req.params
    const productoParaAgregar = req.body
    carritoById = await carrito.addProductToCart(id, productoParaAgregar)
    res.json(carritoById)
}

//********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

const deleteCartById = async (req, res) => {
    const { id } = req.params
    await carrito.deleteById(id)
}

//********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************

const deleteProductFromCart = async (req, res) => {
    const { idCart, idProduct } = req.params
    await carrito.deleteProductById(idCart, idProduct)
}

const getCartByEmail = async (req, res) => {
    const { emailId } = req.params
    console.log("email: ", emailId);
    const carritoByEmail = await carrito.getByEmail(emailId)
    console.log(carritoByEmail);
    res.json(carritoByEmail)
}

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

//********************** '*' Rest of the routes **********************************

const routeNotAvailable = async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
}

module.exports = {
    getProductsFromCart,
    postCart,
    postProductToCart,
    deleteCartById,
    deleteProductFromCart,
    getCartByEmail,
    // postSendOrder,
    routeNotAvailable
}