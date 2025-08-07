const express=require("express")
const router = express.Router();
const {getMovies,createMovie}=require('../controler/movieC.js')
router.get("/",getMovies);
router.post("/",createMovie);
module.exports=router