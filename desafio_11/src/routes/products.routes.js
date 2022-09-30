const express = require("express");
const router = express.Router();

const ApiProductsMock = require('../api/productsMock');
const apiProduct = new ApiProductsMock();

// ------------------- Mock DATA ------------------- //
router.get('/api/productos-test', async (req, res) => {
    res.json(await apiProduct.popular(5))
})
// -------------------------------------------------- //

module.exports = router;
