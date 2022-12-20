const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const UsersDaoMongoDb = require('../daos/usersDaoMongo')
const users = new UsersDaoMongoDb()

const dotenv = require('dotenv').config() // 1
const mailer = require('../mailer/mailer')

// ---------------------- Utils -----------------------
const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

// ----------------- Serializers ----------------------
passport.serializeUser(function (user, done) {
    logger.info("serialize");
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    logger.info("deserialize");
    done(null, user);
});

// ------------- Passport Middlewares -----------------
passport.use('login', new LocalStrategy(
    async (username, password, done) => {
        let user = await users.getByUsername(username)
        // logger.info(user);
        
        if (!user) {
            logger.info(`No existe el usuario ${username}`)
            return done(null, false, { message: 'User not found' })
        }
        
        if (!isValidPassword(user, password)) {
            logger.info('Password incorrecto')
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
        logger.info(`El usuario ${username} ya existe`)
        return done(null, false, { message: 'User already exists' })
    }

    const { email, completeName, address, age, phone, photo } = req.body

    let newUser = {
        username,
        password: createHash(password),
        email,
        completeName,
        address,
        age,
        phone,
        photo
    }

    // Enviar correo de Registro al Admin
    const signupMessage = `Datos del Usuario Registrado: <br><br> 
                            Usuario: ${username} <br>
                            Email: ${email} <br>
                            Nombre Completo: ${completeName} <br>
                            Direccion: ${address} <br>
                            Edad: ${age} <br>
                            Telefono: ${phone}`

    const mailOptions = {
        from: 'MaraArtesanias',
        to: process.env.MAIL_ADMIN,
        subject: 'Nuevo Registro',
        html: signupMessage
        // html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
    }

    mailer(mailOptions)

    await users.save(newUser)  // Grabar usuario en BD

    return done(null, req.body)

}))

module.exports = passport;

