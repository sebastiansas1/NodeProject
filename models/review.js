const mongoose = require('mongoose');

// Review Schema
const reviewSchema = mongoose.Schema({

  title: {
    type: String,
  },

  comment: {
    type: String,
  },

  score: {
    type: Number,
  },

  restaurant_id: {
    type: Number,
  }
  
});

const Review = module.exports = mongoose.model('Review', reviewSchema);