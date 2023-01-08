const { response } = require('express')
const { cartsDao } = require("../daos/index");
const cart = cartsDao

//********************** GET: '/:id/productos' (Listar todos los productos de un carrito) **********************************

const getProductsFromCart = async (req, res) => {
    const { id } = req.params
    const cartById = await cart.getById(id)
    productsList = cartById.products
    res.json(productsList)
}

//********************** POST: '/' (Crea un carrito y devuelve su ID) **********************************

const postCart = async (req, res) => {
    const idCart = await cart.save(req.body)
    res.json(idCart)
}

//********************** POST: '/:id/productos' (Incorporar productos al carrito) **********************************

const postProductToCart = async (req, res) => {
    const { id } = req.params
    const productToAdd = req.body
    cartById = await cart.addProductToCart(id, productToAdd)
    res.json(cartById)
}

//********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

const deleteCartById = async (req, res) => {
    const { id } = req.params
    await cart.deleteById(id)
}

//********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************

const deleteProductFromCart = async (req, res) => {
    const { idCart, idProduct } = req.params
    await cart.deleteProductById(idCart, idProduct)
}

const getCartByEmail = async (req, res) => {
    const { emailId } = req.params
    console.log("email: ", emailId);
    const cartByEmail = await cart.getByEmail(emailId)
    console.log(cartByEmail);
    res.json(cartByEmail)
}

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
    routeNotAvailable
}