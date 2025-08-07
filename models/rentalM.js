// models/rental.js
const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
  customer: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    phone: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15
    }
  },
  movie: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0
    }
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});

const Rental = mongoose.model('Rental', rentalSchema);

function validateRental(body) {
  const schema = Joi.object({
    customerId: Joi.string().required(),
    movieId: Joi.string().required()
  });

  return schema.validate(body);
}

module.exports = {
  Rental,
  validateRental
};
