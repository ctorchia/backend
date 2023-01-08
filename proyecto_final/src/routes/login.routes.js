const {messagesDao} = require("../daos/index");
const message = messagesDao
//*************************************************/
const {getRoot, getLogin, postLogin, getLogout, getSignup, getSignupError, getLoginError, postSignup, getOthers} = require('../controllers/login.controller')

const express = require("express");
const checkAuth = require('../middlewares/auth.middleware');
const logger = require('../logger/logger');
const passport = require('passport')

const routerLogin = express.Router();

// *************************************
routerLogin.get('/chat', async (req, res) => {
  logger.info(`El usuario logueado es`);
  res.render('chat')

})

routerLogin.get('/chat/:email', async (req, res) => {
  const { email } = req.params
  const messages = await message.getAllByEmail(email)
  res.json(messages)

})
// *************************************

routerLogin.get('/', checkAuth, getRoot)

routerLogin.get('/login', getLogin)

routerLogin.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/loginError',
}), postLogin)

routerLogin.get("/logout", getLogout);

routerLogin.get("/signup", getSignup)

routerLogin.get("/signupError", getSignupError)

routerLogin.get("/loginError", getLoginError)

routerLogin.post('/signup', passport.authenticate('signup', { failureRedirect: '/signupError' }), postSignup);

routerLogin.get("*", getOthers)


module.exports = routerLogin;
