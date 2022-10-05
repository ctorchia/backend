const MongoStore = require('connect-mongo');
const session = require('express-session')

const passport = require('./middlewares/passportLocal.middleware')

const login = require('./routes/login.routes.js')
const products = require('./routes/products.routes.js')
const messages = require('./routes/messages.routes.js')

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', './src/views/pages')

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { log } = require("console")
const serverHttp = new HttpServer(app)
const io = new IOServer(serverHttp)
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

app.use(passport.initialize())
app.use(passport.session())

app.use(login);
app.use(products)

io.on('connection', (socket) => {
    console.log('nueva conexion');
    messages(socket, io)
})

serverHttp.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

