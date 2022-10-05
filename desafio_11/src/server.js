const MongoStore = require('connect-mongo');

const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const UsersDaoMongoDb = require('./daos/usersDaoMongo')
const users = new UsersDaoMongoDb()

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

// ---------------------- Utils -----------------------
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// ----------------- Serializers ----------------------
passport.serializeUser(function (user, done) {
    console.log("serialize");
    done(null, user);
  });
  
  passport.deserializeUser(function (user, done) {
    console.log("deserialize");
    done(null, user);
  });

// ------------- Passport Middlewares -----------------
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        let user = await users.getByUsername(username)
        console.log(user);

        if (!user) {
            console.log(`No existe el usuario ${username}`)
            return done(null, false, { message: 'User not found' })
        }

        if (!isValidPassword(user, password)) {
            console.log('Password incorrecto')
            return done(null, false, { message: 'Password incorrect' })
        }

        done(null, user)
    }
))

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    let user = await users.getByUsername(username)
    
    if (user) {
        console.log(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }
    
    const {email } = req.body
    
    let newUser = {
        username,
        password: createHash(password),
        email
    }

    await users.save(newUser)  // Grabar usuario en BD

    return done(null, req.body)

}))
// ----------------------------------------------------

serverHttp.listen(PORT, (err) => {
    if (err) throw new Error(`No se pudo iniciar el servidor: ${err}`)
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

