// apartmentModel.js
const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
  type: String,
  price: Number,
  name: String,
  code: String,
  description: String,
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
