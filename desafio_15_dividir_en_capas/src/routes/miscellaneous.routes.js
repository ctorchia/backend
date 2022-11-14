const express = require("express");
const routerMiscellaneous = express.Router();
const compression = require('compression')
const { getInfo, getRandomProducts, get404 } = require('../controllers/miscellaneous.controller')


routerMiscellaneous.get("/info", compression(), getInfo);

routerMiscellaneous.get("/api/randoms", getRandomProducts);

routerMiscellaneous.get("*", get404)

module.exports = routerMiscellaneous