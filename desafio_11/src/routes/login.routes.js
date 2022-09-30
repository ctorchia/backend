const express = require("express");
const authMiddleware = require('../middlewares/auth.middleware');

const passport = require('passport')


const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
      next()
  } else {
      res.redirect('/login')
  }
}


const router = express.Router();

router.get('/', /* authMiddleware, */ checkAuth, async (req, res) => {
  console.log(`El usuario logueado es ${req.session.username}`);
  res.render('index', {
    username: req.session.username,
  })
})

router.get('/login', async (req, res) => {
  // console.log(`El usuario logueado es ${req.session.username}`);
  // res.render('pages/login')              // Bloque anterior

  if (req.isAuthenticated()) {
    const { user } = req.user
    console.log('user logueado')
    res.render('index')
  } else {
    console.log('user no logueado')
    res.render('login')
  }

})

// router.post("/login", async (req, res) => {  // metodo debe ser post
//   try {
//     const { username } = req.body;
//     req.session.username = username
//     console.log(req.session.username);
//     res.redirect("/")
//   } catch (err) {                        
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login',
}), (req, res) => {
  const { username, password } = req.body
  // const {user} = req.user
  res.render('index')
})


router.get("/logout", async (req, res) => {  // metodo debe ser delete
  let username = req.session.username
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

module.exports = router;
