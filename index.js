const express = require('express');

//express router
const router = express.Router();

//get 요청
router.get("/",(req, res) =>{
    res.send("Hello Index Router!");
});

//router export
module.exports = router;