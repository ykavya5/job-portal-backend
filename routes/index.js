const express = require("express");
const router = express.Router();

router.get("/ping", (req, res)=>{
    res.status(200).send("hello from recuriter")
});

module.exports = router;