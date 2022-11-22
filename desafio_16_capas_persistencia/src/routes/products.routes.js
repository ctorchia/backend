const express = require("express");
const routerProductsMock = express.Router();

const { getProductsMock} = require('../controllers/products.controller')

// ------------------- Mock DATA ------------------- //
routerProductsMock.get('/api/productos-test', getProductsMock)
// -------------------------------------------------- //

module.exports = routerProductsMock;
