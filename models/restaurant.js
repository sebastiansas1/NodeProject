const mongoose = require('mongoose');

// Restaurant Schema
const restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nr: {
    type: String
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  country: {
    type: String
  },
  postcode: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  website: {
    type: String
  },
  cuisine:  
    [{
      type: String
    }],
  description: {
    type: String
  },
  image: 
  [{
    type: String
  }]
  
});


const Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);