let mongoose = require('mongoose');

// Restaurant Schema
let restaurantSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cousine: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});


let Restaurant = module.exports = mongoose.model('Restaurant', restaurantSchema);