 const {Movie,validateGendra}=require("../models/movi.js")
 
 async function createMovie(req, res) {
  const { error } = validateGendra(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie created", movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get All (with populated genre)
 async function getMovies(req, res) {
  try {
    const movies = await Movie.find().populate('genre','name');
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports={getMovies,createMovie}