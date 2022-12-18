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

const postProduct = async (ctx) => {
    if (administrador) {
        const idProduct = await producto.save(ctx.request.body)
        ctx.body = idProduct
    }
    else {
        ctx.body = {
            error: -1,
            description: "Ruta api/productos, Método POST, No autorizado"
        }
    }
}

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

const putProduct = async (ctx) => {
    if (administrador) {
        const respuesta = await producto.updateById(ctx.request.params.id, ctx.request.body)
        ctx.body = respuesta
    }
    else {
        ctx.body= {
            error: -1,
            description: "Ruta api/productos/id, Método PUT, No autorizado"
        }
    }
}

//************************ DELETE (Elimina un producto según su ID) ***********************

const deleteProductById = async (ctx) => {
    if (administrador) {
        const data =  await producto.deleteById(ctx.request.params.id)
    }
    else {
        ctx.body ={
            error: -1,
            description: "Ruta api/productos/id, Método DELETE, No autorizado"
        }
    }
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