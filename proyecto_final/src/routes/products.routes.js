const express = require('express')
const {getProducts,getProductById,getProductByCategory,postProduct,putProduct,deleteProductById,routeNotAvailable} = require('../controllers/products.controller')

const { Router } = express
const routerProductos = Router()

 
//********************** GET (Devuelve todos los productos) **********************************

routerProductos.get('/', getProducts)

//********************** GET (Devuelve un producto según ID) **********************************

routerProductos.get('/:id', getProductById)

//********************** GET (Devuelve productos según Categoria) **********************************

routerProductos.get('/categoria/:category', getProductByCategory)

//************************ POST (Recibe y Agrega un producto) **********************************

routerProductos.post('/', postProduct)

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

routerProductos.put('/:id', putProduct)

//************************ DELETE (Elimina un producto según su ID) ***********************

routerProductos.delete('/:id', deleteProductById)

//********************** '*' Rest of the routes **********************************

routerProductos.get('*', routeNotAvailable)


module.exports = routerProductos
