/*
  -Model for a Restaurant, outlining the database schema.
  -Each of the Restaurant attributes is either a String, an Array of Strings, or a Number
  -Each Restaurant is required to contain a Restauarant name at the very least. All other fields are optional,
  so do not need to be completed by the user in order to create a Restauarant. 
  -Restaurant images are stored as an Array of Strings, where each String is the path to the uploaded image,
  which is stored in Public/Uploads
*/

// Require Mongoose
const mongoose = require('mongoose');

// Restaurant Schema
const restaurantSchema = mongoose.Schema({
  
  // Restauarant name (required)
  name: {
    type: String,
    required: true
  },

  // Address (street number)
  nr: {
    type: String,
    required: true
  },

  // Address (street)
  street: {
    type: String,
    required: true
  },

  // Address (city)
  city: {
    type: String,
    required: true
  },

  // Address (county)
  county: {
    type: String
  },

  // Address (country)
  country: {
    type: String,
    required: true
  },

  // Address (postcode)
  postcode: {
    type: String,
    required: true
  },

  // Contact phone number
  phoneNumber: {
    type: Number
  },

  // Restauarant website
  website: {
    type: String
  },

  // Restauarant cuisine
  cuisine:  
    [{
      type: String,
      required: true
    }],

  // Restauarant description
  description: {
    type: String
  },

  // Restauarant image(s) (official)
  image: 
  [{
    type: String // Should be required 
  }]
  
});

// Attach Schema to Restaurant Model
const Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);