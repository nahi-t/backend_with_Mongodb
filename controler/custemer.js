
const{ Costmer, validateCustomer } = require('../models/custmer.js');
async function get(req,res) {

    const custmers= await Costmer.find();
    res.send(custmers);
   
}
async function create(req, res) {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    const custmer = new Costmer({ 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    await custmer.save();
    res.status(201).send(custmer);
    }

async function put(req, res) {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const custmer = await Costmer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });

    if (!custmer) return res.status(404).send('Customer not found');

    res.send(custmer);
}

async function delet(req, res) {
    const custmer = await Costmer.findByIdAndDelete(req.params.id);
    if (!custmer) return res.status(404).send('Customer not found');

    res.send(custmer);
}

async function byid(req, res) {
    const custmer = await Costmer.findById(req.params.id);
    if (!custmer) return res.status(404).send('Customer not found');

    res.send(custmer);
}
module.exports = {
  get,
  create,
  put,
  delet,
  byid,
};

