const express=require('express');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port=3000;
 const connectDB=require('./db/mongo.js');
const router = require('./rout/gedrarout.js');
const custemer=require('./rout/custmerRout.js')

connectDB();
app.use(express.json());

app.use("/api/genders", router);
app.use("/api/custemer",custemer)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})