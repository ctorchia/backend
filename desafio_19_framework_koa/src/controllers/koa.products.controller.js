// const { response } = require('express')
const {productosDao} = require("../daos/index");
const producto = productosDao

const administrador = true

//********************** GET (Devuelve todos los productos) **********************************
const getProducts = async (ctx) => {
    const listaProductos = await producto.getAll()
    ctx.body = listaProductos
}

//********************** GET (Devuelve un producto según ID) **********************************

const getProductById = async (ctx) => {
    const productoById = await producto.getById(ctx.request.params.id)
    console.log(productoById);
    productoById ?
        ctx.body = productoById    
        :
        ctx.body = "No existe el producto"
}

//************************ POST (Recibe y Agrega un producto) **********************************

const postProduct = async (req, res) => {
    if (administrador) {
        const idProduct = await producto.save(req.body)
        res.json(idProduct)
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
        res.json({ deleted : true })
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