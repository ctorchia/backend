const express = require('express')
const Producto = require("./contenedor")

const producto = new Producto('./productos.txt')

const app = express()

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
})

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
server.on('error', (err) => console.log(err))

//********************** GET (Devuelve todos los productos) **********************************

app.get('/api/productos', async (req, res) => {
    const listaProductos = await producto.getAll()
    res.json(listaProductos)
})

//********************** GET (Devuelve un producto según ID) **********************************

app.get('/api/productos/:id', async (req, res) => {

    const { id } = req.params
    const productoById = await producto.getById(parseInt(id))
    productoById ?
        res.json(productoById)
        :
        res.json({ error: 'Producto no encontrado' })
})

//************************ POST (Recibe y Agrega un producto) **********************************

app.post('/api/productos/', async (req, res) => {
    const idProduct = await producto.save(req.body)
    const productoById = await producto.getById(parseInt(idProduct))
    res.json(productoById)
})

//************************ PUT (Recibe y Actualiza un producto según su ID) ***********************

app.put('/api/productos/:id', async (req, res) => {

    const { id } = req.params
    producto.updateById(parseInt(id), req.body)
    // const productoById = await producto.getById(parseInt(id))
    // productoById ?
    //     res.json(productoById)
    //     :
    //     res.json({ error: 'Producto no encontrado' })
})

//************************ DELETE (Elimina un producto según su ID) ***********************

app.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    producto.deleteById(parseInt(id))
    
})
