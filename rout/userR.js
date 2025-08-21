const express=require("express")
const auth = require('../midleware/auth.js');
const router = express.Router();
const {reg,login,Cuser} = require('../controler/userC.js');

router.post("/", reg);
router.post("/login",login)
router.get("/c",auth, Cuser);
module.exports = router;