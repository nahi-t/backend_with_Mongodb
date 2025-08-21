// controllers/rentals.js
const { Rental, validateRental } = require('../models/rentalM.js');
const {Costmer}  = require('../models/custmer.js'); 
const {Movie} = require('../models/movi.js'); 

async function createRental(req, res) {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const costmer = await Costmer.findById(req.body.cid);
  if (!costmer) return res.status(400).json({ error: 'Invalid Costmer ID' });
  console.log(costmer._id)

  const movie = await Movie.findById(req.body.mid);
  if (!movie) return res.status(400).json({ error: 'Invalid movie ID' });

  if (movie.numberInStock === 0)
    return res.status(400).json({ error: 'Movie not in stock' });

  const rental = new Rental({
    costmer: {
      _id: costmer._id,
      name: costmer.name,
      phone: costmer.phone
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
