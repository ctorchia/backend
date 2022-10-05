const express = require("express");
const checkAuth = require('../middlewares/auth.middleware');

const passport = require('passport')

const router = express.Router();

router.get('/', checkAuth, async (req, res) => {
  console.log(`El usuario logueado es ${req.session.passport.user.username}`);
  res.render('index', {
    username: req.session.passport.user.username,
  })
})

router.get('/login', async (req, res) => {
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
  const { username, password } = req.body
  res.render('index')
})

router.get("/logout", async (req, res) => {  // metodo debe ser delete
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
  res.render('signup')
})

router.get("/signupError", async (req, res) => {
  res.render('signupError')
})

router.get("/loginError", async (req, res) => {
  res.render('loginError')
})

router.post('/signup', passport.authenticate('signup', { failureRedirect: '/signupError' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
