const express = require("express");
const checkAuth = require('../middlewares/auth.middleware');
const { getRoot, getLogin, postLogin, getLogout, getSignup, postSignup, getSignupError, getLoginError } = require('../controllers/login.controller');

const passport = require('passport')

const routerLogin = express.Router();


routerLogin.get('/', checkAuth, getRoot)

routerLogin.get('/login', getLogin)

routerLogin.post('/login', passport.authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/loginError',
}), postLogin)

routerLogin.post('/signup', passport.authenticate('signup', { 
  failureRedirect: '/signupError' 
}), postSignup);

routerLogin.get("/logout", getLogout);

routerLogin.get("/signup", getSignup)

routerLogin.get("/signupError", getSignupError)

routerLogin.get("/loginError", getLoginError)


module.exports = routerLogin;
