const numCPUs = require('os').cpus().length
const { arguments } = require('../config');
const { fork } = require('child_process');
const logger = require('../logger/logger');

//********************** GET (Info) **********************************
const getInfo = (req, res) => {

    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    info = {
        args: JSON.stringify(arguments),
        path: process.execPath,
        platform: process.platform,
        processId: process.pid,
        nodeVersion: process.version,
        directoryProject: process.cwd(),
        memory: JSON.stringify(process.memoryUsage()),
        numCPUs: numCPUs
    }

    res.render('info', { info });
}

//********************** GET (Random Products) **********************************
const getRandomProducts = (req, res) => {
    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    let { cant } = req.query;
    console.log(cant);
    const random = fork('../desafio_15_dividir_en_capas/src/api/randoms.js', [cant]);
    random.send('start');
    random.on('message', obj => {
        res.json(obj);
    })
}

//********************** GET (Ruta no existente) **********************************
const get404 = async (req, res) => {
    const { url, method } = req
    logger.warn(`Se recibio una peticion ${method} a la ruta ${url}`)
  
    // res.render('loginError')
    res.send(`<h1>Ruta no existente</h1>`)
  }


module.exports = {
    getInfo,
    getRandomProducts,
    get404
}