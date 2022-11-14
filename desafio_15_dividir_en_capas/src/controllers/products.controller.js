const logger = require('../logger/logger');
const ApiProductsMock = require('../api/productsMock');
const apiProduct = new ApiProductsMock();

//********************** GET (Productos Mock) **********************************
const getProductsMock = async (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    res.json(await apiProduct.popular(5))
}

module.exports = {
    getProductsMock
}