const mongoose = require('mongoose'); 
const Joi = require('joi');

// Define schema using mongoose
const custmerschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold:{
    type:Boolean,
    required:true,
  },
  phone:{
    type:Number,
    required:true,


  }
});
const Costmer = mongoose.model('custmar', custmerschema);
function validateCustomer(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.boolean().required(),  
    phone: Joi.number().required()     
      .min(100000000)       
      .max(9999999999)                 
  });
  return schema.validate(body);
}
module.exports = {
  Costmer,
  validateCustomer,
};