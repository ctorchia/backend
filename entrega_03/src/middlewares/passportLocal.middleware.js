const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const UsersDaoMongoDb = require('../daos/usersDaoMongo')
const users = new UsersDaoMongoDb()

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
    
    const {email, completeName, address, age, phone, photo} = req.body
    
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

    await users.save(newUser)  // Grabar usuario en BD

    return done(null, req.body)

}))

module.exports = passport;

