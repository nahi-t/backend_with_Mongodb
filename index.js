const express=require('express');
const config = require('config');
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const port=3000;
 const connectDB=require('./db/mongo.js');
const router = require('./rout/gedrarout.js');
const custemer=require('./rout/custmerRout.js')
const movier=require('./rout/movirout.js')
const rent=require('./rout/Rentrout.js')
const userR=require('./rout/userR.js');
const c = require('config');

if(!config.get("jwtPrivateKey")){
    console.error("FATAL ERROR: jwtPrivateKey is not defined.");
    process.exit(1);
}
try{
    connectDB();
app.use(express.json());

app.use("/api/genders", router);
app.use("/api/users", userR);
app.use("/api/custemer",custemer)
app.use("/api/movie",movier)
app.use("/api/rentals", rent)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
} catch (ex) {
    console.error("Error starting server:", ex);
    process.exit(1);
}
