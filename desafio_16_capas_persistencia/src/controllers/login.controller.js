const { response } = require('express')
const logger = require('../logger/logger');

// const { loginDao } = require("../daos/index"); CREO QUE ESTO NO ES NECESARIO
// const login = loginDao

//********************** GET (Raiz) **********************************
const getRoot = async (req, res) => {
    console.log(`El usuario logueado es ${req.session.passport.user.username}`);
    res.render('index', {
        username: req.session.passport.user.username,
    })
}


//********************** GET (Login) **********************************
const getLogin = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    if (req.isAuthenticated()) {
        const { user } = req.user
        console.log('user logueado')
        res.render('index')
    } else {
        console.log('user no logueado')
        res.render('login')
    }
}

//********************** POST (Login) **********************************
const postLogin = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    const { username, password } = req.body
    res.render('index')
}

//*********************** POST (Signup) *********************************

const postSignup = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.redirect('/');
}

//********************** GET (Logout) **********************************
const getLogout = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    let username = req.session.passport.user.username
    try {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
            }
        })
        return res.json({ name: username, status: "destoyed" })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
}

//*********************** GET (Signup) *********************************
const getSignup = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.render('signup')
}

//*********************** POST (SignupError) *********************************
const getSignupError = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    logger.error("Error al registrarse")

    res.render('signupError')
}

//*********************** GET (LoginError) *********************************
const getLoginError = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
    logger.error("Error al loguearse")

    res.render('loginError')
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getLogout,
    getSignup,
    getSignupError,
    getLoginError,
    postSignup
}