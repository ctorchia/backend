const express = require('express')
const { Router } = express
const Producto = require("./contenedor")
const Carrito = require("./contenedorCarrito")

const producto = new Producto('./productos.json')
const carrito = new Carrito('./carritos.json')


const app = express()
const routerProductos = Router()
const routerCarrito = Router()


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
})

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
server.on('error', (err) => console.log(err))

//********************** CONTROLADOR DE PRODUCTOS ********************************************

//********************** GET (Devuelve todos los productos) **********************************

routerProductos.get('/', async (req, res) => {
    const listaProductos = await producto.getAll()
    res.json(listaProductos)
})

//********************** GET (Devuelve un producto según ID) **********************************

routerProductos.get('/:id', async (req, res) => {

    const { id } = req.params
    const productoById = await producto.getById(parseInt(id))
    productoById ?
        res.json(productoById)
        :
        res.json({ error: 'Producto no encontrado' })
})

//************************ POST (Recibe y Agrega un producto) **********************************

routerProductos.post('/', async (req, res) => {
    const idProduct = await producto.save(req.body)
    const productoById = await producto.getById(parseInt(idProduct))
    res.json(productoById)
})

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

routerProductos.put('/:id', async (req, res) => {

    const { id } = req.params
    const respuesta = await producto.updateById(parseInt(id), req.body)
    res.json(respuesta)
})

//************************ DELETE (Elimina un producto según su ID) ***********************

routerProductos.delete('/:id', async (req, res) => {
    const { id } = req.params
    await producto.deleteById(parseInt(id))
})


//********************** CONTROLADOR DE CARRITO ********************************************

//********************** POST: '/' (Crea un carrito y devuelve su ID) **********************************

routerCarrito.post('/', async (req, res) => {
    const idCarrito = await carrito.save(req.body)
    // const carritoById = await carrito.getById(parseInt(idCarrito))
    res.json(carritoById)
})

//********************** DELETE: '/:id' (Vacia un carrito y lo elimina) **********************************

//********************** GET: '/:id/productos' (Listar todos los productos de un carrito) **********************************

routerCarrito.get('/', async (req, res) => {
    // const listaProductos = await producto.getAll()
    res.json({"Prueba":"Mensaje de Prueba"})
})

//********************** POST: '/:id/productos' (Incorporar productos al carrito) **********************************

//********************** DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito) **********************************


//--- INFO ---
// const dateMessage = dateFns.format(new Date(), 'DD/MM/YYYY HH:mm:ss');