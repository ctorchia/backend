const express = require('express')   
const routerProductos = require('./routes/products.route')
const routerCarrito = require('./routes/carts.route')

const dotenv = require('dotenv').config() // 1

const app = express()

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
