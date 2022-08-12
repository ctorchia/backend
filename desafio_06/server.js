const express = require('express');
const {Server: HttpServer} = require('http') 
const {Server: IOServer} = require('socket.io')

const app = express();
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);

app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname});
})

const productos = [
    {id:1, name:'Producto 1', price:100},
    {id:2, name:'Producto 2', price:200},
    {id:3, name:'Producto 3', price:300}
];

io.on('connection',(socket)=>{
    console.log('nueva conexion');

    const mensaje = {
        mensaje: 'ok',
        productos
    }

    socket.emit('mensaje-server',mensaje);

    socket.on('disconnect',()=>{
        console.log('conexion cerrada', socket.id);
    } )

    socket.on('mensaje-cliente',(data)=>{
        console.log(data);
        io.sockets.emit('mensaje-server', mensaje)
    })

    // socket.on('mensaje',(data)=>{
    //     console.log(data);
    //     io.emit('mensaje',data);
    // } )
})

serverHttp.listen(3000,()=>{
    console.log('Server on port 3000')
})


