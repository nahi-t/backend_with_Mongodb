const Joi = require('joi');
const mongoose = require('mongoose');

const user= mongoose.model("users",new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50

    },
     email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true

    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
        

    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}))

function validatuser(user) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
     email: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(5).max(1024).required(),
      isAdmin: Joi.boolean()
  });
  return schema.validate(user);
}
function validatuserlogin(user) {
  const schema = Joi.object({
  
     email: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(user);
}
module.exports={validatuser,user,validatuserlogin};
