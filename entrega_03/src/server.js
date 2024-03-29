const routerProductos = require('./routes/products.routes')
const routerCarrito = require('./routes/carts.routes')

const dotenv = require('dotenv').config() // 1

const MongoStore = require('connect-mongo')
const session = require('express-session')

// const logger = require('./logger/logger')

const passport = require('./middlewares/passportLocal.middleware')

const routerLogin = require('./routes/login.routes')
// const login = require('./routes/login.routes.js')
// const products = require('./routes/products.routes.js')
// const messages = require('./routes/messages.routes.js')
const miscellaneous = require('./routes/miscellaneous.routes.js')

const express = require('express');
const app = express();
// const PORT = process.env.PORT || 8080
const { arguments, config, mongoDbUrl } = require('./config')
const numCPUs = require('os').cpus().length

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views/pages')

const cluster = require('cluster')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { log } = require("console")
const serverHttp = new HttpServer(app)
const io = new IOServer(serverHttp)
app.use(express.static('public'))

app.use(session({
    store: MongoStore.create({
        // mongoUrl: 'mongodb+srv://ctorchia:Mongo2468@cluster0.vg0dm1l.mongodb.net/?retryWrites=true&w=majority',
        mongoUrl: mongoDbUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }
    }),
    secret: config.sessionSecret,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 10
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/productos', routerProductos)   // Server Original
app.use('/api/carrito', routerCarrito)       // Server Original
app.use('', routerLogin)

// app.use(login);
// app.use(products)
// app.use(miscellaneous)

// io.on('connection', (socket) => {
//     logger.info('nueva conexion')
//     messages(socket, io)
// })

// const PORT = arguments.port
// const MODE = arguments.mode.toUpperCase()

const MODE = process.env.MODE || "FORK";
const PORT = process.env.PORT || 8080;

if (MODE === 'CLUSTER' && cluster.isMaster) {
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
