const express = require("express");
const router = express.Router();
const { arguments } = require('../config');
// const { fork } = require('child_process');
const numCPUs = require('os').cpus().length

const logger = require('../logger/logger');

// const compression = require('compression')

router.get("", (req, res) => {

    const { url, method } = req
    console.log("Hasta aca llego");
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    info = {
        // args: JSON.stringify(arguments),
        path: process.execPath,
        platform: process.platform,
        processId: process.pid,
        nodeVersion: process.version,
        directoryProject: process.cwd(),
        memory: JSON.stringify(process.memoryUsage()),
        numCPUs: numCPUs
    }


    res.render('info', { info });
});

// router.get("/api/randoms", (req, res) => {
//     const { url, method } = req
//     logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

//     let { cant } = req.query;
//     const random = fork('../desafio_14/src/api/randoms.js', [cant]);
//     random.send('start');
//     random.on('message', obj => {
//         res.json(obj);
//     })
// });

// router.get("*", async (req, res) => {
//     const { url, method } = req
//     logger.warn(`Se recibio una peticion ${method} a la ruta ${url}`)

//     // res.render('loginError')
//     res.send(`<h1>Ruta no existente</h1>`)
//   })

module.exports = router