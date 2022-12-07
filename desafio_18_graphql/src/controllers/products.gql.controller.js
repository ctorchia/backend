const { response } = require('express')
const {productosDao} = require("../daos/index");
const producto = productosDao

const administrador = true

//********************** GET (Devuelve todos los productos) **********************************
const getProducts = async () => {
    const listaProductos = await producto.getAll()
    return listaProductos
}

//********************** GET (Devuelve un producto según ID) **********************************

const getProductById = async ({id}) => {
    const productoById = await producto.getById(parseInt(id))
    return productoById
}

//************************ POST (Recibe y Agrega un producto) **********************************

const postProduct = async ({data}) => {
    const idProduct = await producto.save(data)
    return idProduct
}

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

const putProduct = async ({id,data}) => {
    const response = await producto.updateById(parseInt(id), data)
    return response
}

//************************ DELETE (Elimina un producto según su ID) ***********************

const deleteProductById = async ({id}) => {
    const response = await producto.deleteById(parseInt(id))
    return response
}

//********************** '*' Rest of the routes **********************************

// const routeNotAvailable = async (req, res) => {
//     res.json({
//         error: -2,
//         description: "Ruta no implementada"
//     })
// }

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProductById,
    // routeNotAvailable
}