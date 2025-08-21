const express=require("express")
const router = express.Router();
const auth = require('../midleware/auth.js');
const { get, create, put, delet, byid } = require('../controler/gendres.js');
const admin = require("../midleware/admin.js");

router.get("/",auth,get);
router.post("/",auth,create);
router.put("/:id",[auth,admin],put);
router.delete("/:id",[auth,admin],delet);
router.get("/:id",auth,byid);
module.exports = router;