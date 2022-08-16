const Producto = require("./contenedor")
const objProducto = new Producto('./productos.txt')

const express = require('express');
const app = express();
// const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs') // Prueba 2
app.set('views', './views')

const {Server: HttpServer} = require('http') 
const {Server: IOServer} = require('socket.io');
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.static('public'))  

let productos = []

app.get('/', async (req, res) => {
    
    productos = await objProducto.getAll()

    res.render('pages/index', {
        mensaje: 'Lista de Productos:', // Prueba 2
        productos
    })
})

let mensajes = []

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
        productos.push(producto);
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
        console.log(messageComplete);

        mensajes.push(messageComplete);
        const mensaje = {
            mensaje: 'Mensaje Insertado',
            mensajes
        }
        const id = new Date().getTime();
        io.sockets.emit('mensajeChat-server',mensaje);
        cb(id);
    })

})

// serverHttp.listen(PORT, (err) => {
//     if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
//     console.log(`Servidor corriendo en el puerto ${PORT}`)
// })

serverHttp.listen(3000,()=>{
    console.log('Server on port 3000')
})


