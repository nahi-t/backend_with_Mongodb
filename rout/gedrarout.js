const express=require("express")
const router = express.Router();
const { get, create, put, delet, byid } = require('../controler/gendres.js');

router.get("/",get);
router.post("/",create);
router.put("/:id",put);
router.delete("/:id",delet);
router.get("/:id",byid);
module.exports = router;