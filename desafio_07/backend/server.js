const Producto = require("./contenedor.js")
const objProducto = new Producto('./productos.txt')

const objMensaje = new Producto('./mensajes.txt')

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.set('views', './views')

const {Server: HttpServer} = require('http') 
const {Server: IOServer} = require('socket.io');
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.static('../public'))  

let mensajes = (async ()=>{
    mensajes = await objMensaje.getAll()
})();

let productos = (async ()=>{
    productos = await objProducto.getAll()
})();

app.get('/', async (req, res) => {
    
    res.render('pages/index', {
        mensaje: 'Lista de Productos:',
        productos,
        mensajes
    })
})

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
        await objProducto.save(producto)
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

        await objMensaje.save(messageComplete)
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
