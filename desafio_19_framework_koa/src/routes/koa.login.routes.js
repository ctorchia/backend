// const express = require("express");

const Router = require('koa-router');
const router = new Router();

// const router = new Router({
//     prefix: '/'
// });

const checkAuth = require('../middlewares/auth.middleware');

const logger = require('../logger/logger');

// const passport = require('passport')
const passport = require('../middlewares/koa.passportLocal.middleware')

// const router = express.Router();

// router.get('/', checkAuth, async (ctx) => {
router.get('/', async (ctx) => {
  logger.info(`El usuario logueado es ${ctx.req.user}`);
  
  await ctx.render('index', {
    username: ctx.req.user,
    age: ctx.req.age,
    email: ctx.req.email,
    completeName: ctx.req.completeName,
  })
})

router.get('/login', async (ctx) => {
  logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)

    await ctx.render('login')


  // if (ctx.isAuthenticated()) {
  //   // const { user } = req.user
  //   logger.info('user logueado')
  //   ctx.render('index')
  // } else {
  //   logger.info('user no logueado')
  //   ctx.render('login')
  // }
})

router.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/loginError',
}), async(ctx) => {
  logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)

  const { username, password } = ctx.request.body
  console.log(username,password)
  await ctx.render('index')
})

// router.get("/logout", async (ctx) => {
//   logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)

//   let username = req.session.passport.user.username
//   try {
//     req.session.destroy(err => {
//       if (err) {
//         return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
//       }
//     })
//     return res.json({ name: username, status: "destoyed" })
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

router.get("/signup", async (ctx) => {
  logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)

  await ctx.render('signup')
})

router.get("/signupError", async (ctx) => {
  logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)
  logger.error("Error al registrarse")

  await ctx.render('signupError')
})

router.get("/loginError", async (ctx) => {
  logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)
  logger.error("Error al loguearse")

  await ctx.render('loginError')
})

router.post('/signup', passport.authenticate('signup', { failureRedirect: '/signupError' }), (ctx) => {
  logger.info(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)

  ctx.redirect('/');
});


// router.get("*", async (req, res) => {
//   const { ctx.request.url, ctx.request.method } = req
//   logger.warn(`Se recibio una peticion ${ctx.request.method} a la ruta ${ctx.request.url}`)

//   // res.render('loginError')
//   res.send(`<h1>Ruta no existente</h1>`)
// })

module.exports = router;
