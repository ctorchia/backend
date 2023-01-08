const express = require("express");
const router = express.Router();
const { arguments } = require('../config');
const numCPUs = require('os').cpus().length
const logger = require('../logger/logger');

router.get("", (req, res) => {

    const { url, method } = req
    logger.info(`Se recibio una peticion ${method} a la ruta ${url}`)

    info = {
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

module.exports = router