const mongoose = require('mongoose');

// Review Schema
const reviewSchema = mongoose.Schema({

  title: {
    type: String,
  },

  comment: {
    type: String,
  },

  stars: {
    type: Number,
  },

  restaurant_id: {
    type: String,
  }
  
});

const Review = module.exports = mongoose.model('Review', reviewSchema);