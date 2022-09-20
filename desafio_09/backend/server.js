const HandlerDB = require("./containers/containerDB")

const { optionsMariaDB } = require('../backend/options/mariaDB')
const { optionsSqlite3 } = require('../backend/options/sqlite3.js')

const knexMariaDB = require('knex')(optionsMariaDB)
const knexSqlite3 = require('knex')(optionsSqlite3)

const objProducto = new HandlerDB(knexMariaDB,'products')
const objMensaje = new HandlerDB(knexSqlite3,'messages')

const ApiProductsMock = require('../backend/api/productsMock.js');
const apiProduct = new ApiProductsMock();

const MessagesDaoMongoDb = require('../backend/daos/messagesDaoMongo.js');
const objMessages = new MessagesDaoMongoDb()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './views')

const {Server: HttpServer} = require('http') 
const {Server: IOServer} = require('socket.io');
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.static('../public'))  

let productos = (async ()=>{
    productos = await objProducto.getAll()
})();

let mensajes = (async ()=>{
    mensajes = await objMensaje.getAll()
})();

app.get('/', async (req, res) => {
    
    res.render('pages/index', {
        mensaje: 'Lista de Productos:',
        productos,
        mensajes
    })
})

// ------------------- Mock DATA ------------------- //
app.get('/api/productos-test', async (req,res)=>{
    res.json(await apiProduct.popular(5))
})
// -------------------------------------------------- //

// ------------------- MongoDb ------------------- //
app.post('/mongo-test', async (req, res) => {

        const idProduct = await objMessages.save(req.body)
        // const productoById = await objMessages.getById(parseInt(idProduct))
        // res.json(productoById)
    
})
// ------------------------------------------------ //

io.on('connection',(socket)=>{
    console.log('nueva conexion');

    // ----------------- Products ------------------------------- //
    const mensaje = {
        mensaje: 'ok',
        productos
    }

    socket.emit('mensaje-server',mensaje);

    socket.on('disconnect',()=>{
        console.log('conexion cerrada', socket.id);
    })

    socket.on('producto-nuevo',async (producto,cb)=>{
        console.log(producto);
        await objProducto.add(producto)
        productos = await objProducto.getAll()
        const mensaje = {
            mensaje: 'Producto Insertado',
            productos
        }
        const id = new Date().getTime();
        io.sockets.emit('mensaje-server',mensaje);
        cb(id);
    })

    socket.on('mensaje-cliente',(data)=>{
        console.log(data);
        io.sockets.emit('mensaje-server', mensaje)
    })

// ----------------- Chat ------------------------------- //
    const mensajeChat = {
        mensaje: 'Envio de Mensaje: OK',
        mensajes
    }

    socket.emit('mensajeChat-server',mensajeChat);
    
    socket.on('mensajeChat-nuevo',async (messageComplete,cb)=>{

        await objMensaje.add(messageComplete)
        mensajes = await objMensaje.getAll()
        const mensaje = {
            mensaje: 'Mensaje Insertado',
            mensajes
        }
        const id = new Date().getTime();
        io.sockets.emit('mensajeChat-server',mensaje);
        cb(id);
    })

})

serverHttp.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


// ------ PRUEBAS PRODUCTOS - getById , updateById , deleteById y deleteAll ---------

app.get('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    const productoById = await objProducto.getById(id)
    productoById ?
        res.json(productoById)
        :
        res.json({ error: 'Producto no encontrado' })
})

app.put('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    const respuesta = await objProducto.updateById(id, req.body)
    res.json(respuesta)
    productos = await objProducto.getAll()
})

app.delete('/api/productos/:id', async (req, res) => {
    const { id } = req.params
    res.json(await objProducto.deleteById(id))
    productos = await objProducto.getAll()
})

app.delete('/api/productos', async (req, res) => {
    res.json(await objProducto.deleteAll())
    productos = await objProducto.getAll()

})

// ------ PRUEBAS CHAT - getById , updateById , deleteById y deleteAll ---------

app.get('/api/mensajes/:id', async (req, res) => {
    const { id } = req.params
    const productoById = await objMensaje.getById(id)
    productoById ?
        res.json(productoById)
        :
        res.json({ error: 'Producto no encontrado' })
})

app.put('/api/mensajes/:id', async (req, res) => {
    const { id } = req.params
    const respuesta = await objMensaje.updateById(id, req.body)
    res.json(respuesta)
    mensajes = await objMensaje.getAll()
})

app.delete('/api/mensajes/:id', async (req, res) => {
    const { id } = req.params
    res.json(await objMensaje.deleteById(id))
    mensajes = await objMensaje.getAll()
})

app.delete('/api/mensajes', async (req, res) => {
    res.json(await objMensaje.deleteAll())
    mensajes = await objMensaje.getAll()
})

