const mongoose = require('mongoose');

// Restaurant Schema
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  addressLine1: {
    type: String,
    required: true
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
    required: true
  },
  county: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  website: {
    type: String,
  },
  cuisine:  
    [{
      type: String,
      required: true
    }],
  description: {
    type: String,
    required: true
  }
  
});


const Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);