const express = require("express");
const router = express.Router();
const {arguments} = require('../config');
const {fork} = require('child_process');

router.get("/info", (req, res) => {

    info = {
        args : JSON.stringify(arguments),
        path : process.execPath,
        platform: process.platform,
        processId : process.pid,
        nodeVersion : process.version,
        directoryProject : process.cwd(),
        memory: JSON.stringify(process.memoryUsage())
    }

    res.render('info',{info});
});

router.get("/api/randoms",(req,res)=>{
    let {cant} = req.query;
    console.log(cant);
    const random = fork('../desafio_12/src/api/randoms.js',[cant]);
    random.send('start');
    random.on('message',obj=>{
        res.json(obj);
    })
});

module.exports = router