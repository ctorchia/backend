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

io.on('connection',(socket)=>{
    console.log('nueva conexion');

// ----------------- Chat ------------------------------- //
    
    objMessages.getAll().then(chats =>{
        let chatNormalizado = normalizar({id:'mensajes',messages:chats});
        // console.log(chatNormalizado);
        io.sockets.emit('mensajeChat-server',chatNormalizado);
    })

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


