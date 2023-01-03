const routerProductos = require('./routes/products.routes')
const routerCarrito = require('./routes/carts.routes')
const routerLogin = require('./routes/login.routes')
const routerMessages = require('./routes/messages.routes')

const dotenv = require('dotenv').config() // 1

const MongoStore = require('connect-mongo')
const session = require('express-session')
const passport = require('./middlewares/passportLocal.middleware')

const miscellaneous = require('./routes/miscellaneous.routes.js')

const express = require('express')                                  // Socket
const app = express()                                               // Socket
const { arguments, config, mongoDbUrl } = require('./config')
const numCPUs = require('os').cpus().length

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views/pages')

const cluster = require('cluster')
const { Server: HttpServer } = require('http')                      // Socket
const { Server: IOServer } = require('socket.io')                   // Socket
const { log } = require("console")
const serverHttp = new HttpServer(app)                              // Socket
const io = new IOServer(serverHttp)                                 // Socket
app.use(express.static('public'))                                   // Socket

app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoDbUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/productos', routerProductos)   // Server Original
app.use('/api/carrito', routerCarrito)       // Server Original
app.use('', routerLogin)
// app.use(miscellaneous)

io.on('connection', (socket) => {                                   // Socket
    logger.info('new connection IO:', socket.id)

    // socket.emit('mensajeChat-server', 'Welcome to the server CMT2')

    routerMessages(socket, io)
})

// io.on('connection', (socket) => {                                // Socket
//     logger.info('new connection IO:', socket.id)

//     socket.emit('message-server', 'Welcome to the server CMT')

//     socket.on('disconnect', () => {
//         logger.info('User disconnected')
//     })

//     // messages(socket, io)
// })

// const PORT = arguments.port
// const MODE = arguments.mode.toUpperCase()

const MODE = process.env.MODE || "FORK";
const PORT = process.env.PORT || 8080;

if (MODE === 'CLUSTER' && cluster.isMaster) {                       // Socket
    logger.info(`Puerto: ${PORT} - Modo: ${MODE}`)
    logger.info(`Master ${process.pid} is running`)
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        logger.info(`worker ${worker.process.pid} died`)
    })
} else {
    serverHttp.listen(PORT, (err) => {
        if (err) logger.error('Error al iniciar el servidor')
        logger.info(`Servidor corriendo en el puerto ${PORT} - PID WORKER ${process.pid}`)
    })
}
