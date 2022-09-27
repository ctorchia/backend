const normalizar = require('./utils/normalizar');

const session = require('express-session')
const MongoStore = require('connect-mongo');

const login = require('./routes/login.routes.js')
const products = require('./routes/products.routes.js');

const MessagesDaoMongoDb = require('./daos/messagesDaoMongo');
const objMessages = new MessagesDaoMongoDb()

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io');
const { log } = require("console")
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp);
app.use(express.static('public'))

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))

app.use(login);
app.use(products)

io.on('connection', (socket) => {
    console.log('nueva conexion');

    // ----------------- Chat ------------------------------- //

    objMessages.getAll().then(chats => {
        let chatNormalizado = normalizar({ id: 'mensajes', messages: chats });
        io.sockets.emit('mensajeChat-server', chatNormalizado);
    })

    socket.on('mensajeChat-nuevo', messageComplete => {
        objMessages.save(messageComplete).then(res => {
            objMessages.getAll().then(chats => {
                let chatNormalizado = normalizar({ id: 'mensajes', messages: chats });
                io.sockets.emit('mensajeChat-server', chatNormalizado);
            })
        }
        );
    })

})

serverHttp.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})


