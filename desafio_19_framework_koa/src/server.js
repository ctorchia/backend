// const routerProductos = require('./routes/products.routes')
// const routerCarrito = require('./routes/carts.routes')
// const routerLogin = require('./routes/login.routes')
// const miscellaneous = require('./routes/miscellaneous.routes.js')

const dotenv = require('dotenv').config() // 1
const MongoStore = require('connect-mongo')
// const session = require('express-session')
const passport = require('./middlewares/koa.passportLocal.middleware')

// const express = require('express');
// const app = express();

// *********************  KOA ************************* //

const { arguments, config, mongoDbUrl } = require('./config')


const Koa = require('koa')
const {koaBody} = require('koa-body')
const serve = require('koa-static');
var views = require('koa-views');

const app = new Koa()

const session = require('koa-session')
// app.keys = ['wordSecret']
// app.use(session({}, app))


app.use(serve('./public'));
const render = views('./src/views/pages', { extension: 'ejs' });
app.use(render);


app.use(koaBody())

const routerProductos = require('./routes/koa.products.routes')
const routerCarrito = require('./routes/koa.carts.routes')
const routerLogin = require('./routes/koa.login.routes')

app.use(routerProductos.routes())
app.use(routerCarrito.routes())
app.use(routerLogin.routes())

const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

server.on('error', error => {
    console.log('Server error', error)
})

// ***************************************************** //

// const numCPUs = require('os').cpus().length

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())

// app.set('view engine', 'ejs')
// app.set('views', './src/views/pages')

const cluster = require('cluster')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const { log } = require("console")
const serverHttp = new HttpServer(app)
const io = new IOServer(serverHttp)

// app.use(express.static('public'))



// app.use(session({},app))


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
},app))

app.use(passport.initialize())
app.use(passport.session())
