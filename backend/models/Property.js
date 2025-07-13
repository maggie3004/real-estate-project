const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  image: String, // Main image URL
  images: [String], // Array of image URLs
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  lat: Number,
  lng: Number,
  amenities: [String],
  type: String,
  yearBuilt: Number,
  furnishing: String,
  floor: Number,
  totalFloors: Number,
  facing: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema); 