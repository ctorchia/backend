const express = require("express");
const router = express.Router();
const {arguments} = require('../config');


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
    let {quantity} = req.query;
    const random = fork('../api/randoms.js',[quantity]);
    random.send('start');
    random.on('message',obj=>{
        res.json(obj);
    })
});

module.exports = router