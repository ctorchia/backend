const express = require("express");
const router = express.Router();

const logger = require('../logger/logger');

const ApiProductsMock = require('../api/productsMock');
const apiProduct = new ApiProductsMock();

// ------------------- Mock DATA ------------------- //
router.get('/api/productos-test', async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.json(await apiProduct.popular(5))
})
// -------------------------------------------------- //

module.exports = router;
