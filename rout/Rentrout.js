const express=require("express")
const router = express.Router();
    const {createRental}=require("../controler/rentControler.js")

router.post("/", createRental);
module.exports=router

// const express = require("express");
// const router = express.Router();
// const rentController = require("../controler/rentControler.js");

// router.post("/", rentController.createRental);

// module.exports = router;
