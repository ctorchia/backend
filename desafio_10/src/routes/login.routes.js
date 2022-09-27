const express = require("express");
const authMiddleware = require('../middlewares/auth.middleware');

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

router.post("/login", async (req, res) => {  // metodo debe ser post
  try {
    const { nombre } = req.body;
    req.session.username = nombre
    console.log(req.session.username);
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

module.exports = router;
