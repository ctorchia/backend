const express = require("express");
const authMiddleware = require('../middlewares/auth.middleware');
// const counterMiddleware = require('../../middlewares/count/count.middleware')

const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
    console.log(`El usuario logueado es ${req.session.username}`);
    res.render('pages/index', {
        username: req.session.username,
    })
})

router.get('/login', async (req, res) => {
    console.log(`El usuario logueado es ${req.session.username}`);
    res.render('pages/login')
})


// router.get("/", authMiddleware, counterMiddleware, async (req, res) => {
//   try {
//     res.status(200).send(`<h1>Hola ${req.session.username}, Como estas?, esta es tu visita numero ${req.session.visits}</h1>`)
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// });

router.post("/login", async (req, res) => {  // metodo debe ser post
  try {
    // const { username, password } = req.query;.
    const { nombre } = req.body;
    req.session.username = nombre
    console.log(req.session.username);
    // if (username == "Pablo" && password == "123456") {
    //   req.session.username = username;
    //   req.session.admin = true;
    //   return res.status(200).send(`<h1>Usuario autenticado exitosamente</h1>`);
    // }
    // return res.status(400).send(`<h1>Datos incorrectos</h1>`);
    res.redirect("/")
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/logout", async (req, res) => {  // metodo debe ser delete
  let username = req.session.username
    try {
    req.session.destroy(err => {
        if(err){
            return res.status(500).send(`<h1>No se pudo cerrar sesion</h1>`)
        }
    })
    return res.json({ name: username, status: "destoyed" })
    // return res.status(200).send(`<h1>Hasta la vuelta</h1>`)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
