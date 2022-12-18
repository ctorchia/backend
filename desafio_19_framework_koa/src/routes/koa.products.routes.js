const Router = require('koa-router');
const routerProductos = new Router({
    prefix: '/api/productos'
});

const {getProducts,getProductById,postProduct,putProduct,deleteProductById,routeNotAvailable} = require('../controllers/koa.products.controller')


//********************** GET (Devuelve todos los productos) **********************************

routerProductos.get('/', getProducts)

//********************** GET (Devuelve un producto según ID) **********************************

routerProductos.get('/:id', getProductById)

//************************ POST (Recibe y Agrega un producto) **********************************

routerProductos.post('/', postProduct)

// //************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

// routerProductos.put('/:id', putProduct)

// //************************ DELETE (Elimina un producto según su ID) ***********************

// routerProductos.delete('/:id', deleteProductById)

// //********************** '*' Rest of the routes **********************************

// routerProductos.get('*', routeNotAvailable)


module.exports = routerProductos
