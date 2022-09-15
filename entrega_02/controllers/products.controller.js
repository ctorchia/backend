const { response } = require('express')
const {productosDao} = require("../daos/index");
const producto = productosDao

const administrador = true

//********************** GET (Devuelve todos los productos) **********************************
const getProducts = async (req, res) => {
    const listaProductos = await producto.getAll()
    res.json(listaProductos)
}

//********************** GET (Devuelve un producto según ID) **********************************

const getProductById = async (req, res) => {
    const { id } = req.params
    const productoById = await producto.getById(parseInt(id))
    productoById ?
        res.json(productoById)
        :
        res.json({ error: 'Producto no encontrado' })
}

//************************ POST (Recibe y Agrega un producto) **********************************

const postProduct = async (req, res) => {
    if (administrador) {
        const idProduct = await producto.save(req.body)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos, Método POST, No autorizado"
        })
    }
}

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

const putProduct = async (req, res) => {
    if (administrador) {
        const { id } = req.params
        const respuesta = await producto.updateById(parseInt(id), req.body)
        res.json(respuesta)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos/id, Método PUT, No autorizado"
        })
    }
}

//************************ DELETE (Elimina un producto según su ID) ***********************

const deleteProductById = async (req, res) => {
    if (administrador) {
        const { id } = req.params
        await producto.deleteById(parseInt(id))
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos/id, Método DELETE, No autorizado"
        })
    }
}

//********************** '*' Rest of the routes **********************************

const routeNotAvailable = async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProductById,
    routeNotAvailable
}