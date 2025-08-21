const mongoose = require('mongoose'); 
const Joi = require('joi');

// Define schema using mongoose
const gendraschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

// Create model
const Gendra = mongoose.model('Gendra', gendraschema);


// Validation
function validateGendra(body) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });
  return schema.validate(body);
}
module.exports = {
  Gendra,
  validateGendra,
};