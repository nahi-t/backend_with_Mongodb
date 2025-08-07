const{ Gendra, validateGendra } = require('../models/gandraM.js');
// GET all
async function get(req, res) {
  const gendras = await Gendra.find();
  res.send(gendras);
}

// GET by ID
async function byid(req, res) {
  const gendra = await Gendra.findById(req.params.id);
  if (!gendra) return res.status(404).send('Not found.');
  res.send(gendra);
}

// POST
async function create(req, res) {
  const { error } = validateGendra(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gendra = new Gendra({ name: req.body.name });
  await gendra.save();
  res.status(201).send(gendra);
}

// PUT
async function put(req, res) {
  const { error } = validateGendra(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const gendra = await Gendra.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!gendra) return res.status(404).send('Not found.');
  res.send(gendra);
}

// DELETE
async function delet(req, res) {
  const gendra = await Gendra.findByIdAndDelete(req.params.id);
  if (!gendra) return res.status(404).send('Not found.');
  res.send(gendra);
}

module.exports = {
  get,
  create,
  put,
  delet,
  byid,
};
