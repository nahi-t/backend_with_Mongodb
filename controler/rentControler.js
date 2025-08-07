// controllers/rentals.js
const { Rental, validateRental } = require('../models/rental');
const { Customer } = require('../models/custmer.js'); // create this
const { Movie } = require('../models/movi'); // already done

async function createRental(req, res) {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).json({ error: 'Invalid customer ID' });

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).json({ error: 'Invalid movie ID' });

  if (movie.numberInStock === 0)
    return res.status(400).json({ error: 'Movie not in stock' });

  const rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  // Update stock and save
  movie.numberInStock--;
  await movie.save();
  await rental.save();

  res.status(201).json(rental);
}

module.exports = {
  createRental
};
