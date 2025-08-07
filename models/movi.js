const mongoose = require('mongoose');
const Joi = require('joi');
require('./gandraM.js')

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 255
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'movies', 
    required: true
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

function validateGendra(body) {
  const schema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  genre: Joi.string().required().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId validation'),
  numberInStock: Joi.number().integer().min(0).required(),
  dailyRentalRate: Joi.number().min(0).required(),
  isAvailable: Joi.boolean()
  });
  return schema.validate(body);
}

const Movie = mongoose.model('Movie', movieSchema);
module.exports = {Movie,validateGendra}
