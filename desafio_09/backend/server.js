const HandlerDB = require("./containers/containerDB")

const { optionsMariaDB } = require('../backend/options/mariaDB')
const { optionsSqlite3 } = require('../backend/options/sqlite3.js')

const knexMariaDB = require('knex')(optionsMariaDB)
const knexSqlite3 = require('knex')(optionsSqlite3)

const objProducto = new HandlerDB(knexMariaDB,'products')
const objMensaje = new HandlerDB(knexSqlite3,'messages')

const normalizar = require('../backend/utils/normalizar')

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
const { log } = require("console")
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.static('../public'))  

// let productos = (async ()=>{
//     productos = await objProducto.getAll()
// })();

// let mensajes = (async ()=>{
//     mensajes = await objMessages.getAll()
// })();
// mensajes = normalizar({id:'mensajes',messages:mensajesCrudo})

app.get('/', async (req, res) => {
    
    res.render('pages/index', {
        mensaje: 'Lista de Productos:',
        // productos,
        // mensajes
    })
})

// ------------------- Mock DATA ------------------- //
app.get('/api/productos-test', async (req,res)=>{
    res.json(await apiProduct.popular(5))
})
// -------------------------------------------------- //

// ------------------- MongoDb ------------------- //
// app.post('/mongo-test', async (req, res) => {

//         const idProduct = await objMessages.save(req.body)
//         // const productoById = await objMessages.getById(parseInt(idProduct))
//         // res.json(productoById)
    
// })
// ------------------------------------------------ //

io.on('connection',(socket)=>{
    console.log('nueva conexion');

// ----------------- Chat ------------------------------- //
    
    // const mensajeChat = {
    //     mensaje: 'Envio de Mensaje: OK',
    //     mensajes
    // }

    objMessages.getAll().then(chats =>{
        let chatNormalizado = normalizar({id:'mensajes',messages:chats});
        // console.log(chatNormalizado);
        io.sockets.emit('mensajeChat-server',chatNormalizado);
    })

    // socket.emit('mensajeChat-server',mensajeChat);
    
    // socket.on('mensajeChat-nuevo',async (messageComplete,cb)=>{
    //     // console.log(messageComplete);
    //     await objMessages.save(messageComplete)
    //     mensajes = await objMessages.getAll()
    //     let chatNormalizado = normalizar({id:'mensajes',messages:mensajes});
        
    //     // const mensaje = {
    //     //     mensaje: 'Mensaje Insertado',
    //     //     mensajes
    //     // }
    //     const id = new Date().getTime();
    //     // io.sockets.emit('mensajeChat-server',chatNormalizado);
    //     socket.emit('mensajeChat-server',chatNormalizado);
    //     cb(id);
    // })
    
    socket.on('mensajeChat-nuevo',messageComplete=>{
        objMessages.save(messageComplete).then(res =>{
            objMessages.getAll().then(chats =>{
                let chatNormalizado = normalizar({id:'mensajes',messages:chats});
                io.sockets.emit('mensajeChat-server',chatNormalizado);
            })
        }
        );
    })
    
})

serverHttp.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


