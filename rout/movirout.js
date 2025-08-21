const express=require("express")
const router = express.Router();
const {getMovies,createMovie,getbyid}=require('../controler/movieC.js')
router.get("/",getMovies);
router.post("/",createMovie);
router.get("/:id",getbyid);
module.exports=router