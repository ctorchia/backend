const express = require("express");
const checkAuth = require('../middlewares/auth.middleware');

const logger = require('../logger/logger');

const passport = require('passport')

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  console.log(`El usuario logueado es ${req.session.passport.user.username}`);
  res.render('index', {
    username: req.session.passport.user.username,
  })
})

router.get('/login', async (req, res) => {
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
})

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/loginError',
}), (req, res) => {
  const { url, method } = req
  logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

  const { username, password } = req.body
  res.render('index')
})

router.get("/logout", async (req, res) => {
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
});

router.get("/signup", async (req, res) => {
  const { url, method } = req
  logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

  res.render('signup')
})

router.get("/signupError", async (req, res) => {
  const { url, method } = req
  logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
  logger.error("Error al registrarse")

  res.render('signupError')
})

router.get("/loginError", async (req, res) => {
  const { url, method } = req
  logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)
  logger.error("Error al loguearse")

  res.render('loginError')
})

router.post('/signup', passport.authenticate('signup', { failureRedirect: '/signupError' }), (req, res) => {
  const { url, method } = req
  logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

  res.redirect('/');
});

router.get("*", async (req, res) => {
  const { url, method } = req
  logger.warn(`Se recibio una peticion ${method} a la ruta ${url}`)

  // res.render('loginError')
  res.send(`<h1>Ruta no existente</h1>`)
})

module.exports = router;
