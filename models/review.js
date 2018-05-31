/*
  -Model for a Review, outlining the database schema.
  -Each of the Review attributes is either a String, an Array of Strings, or an Number (Integer) 
  -Review images are stored as an Array of Strings, where each String is the path to the uploaded image,
  which is stored in Public/Uploads. These images are therefore global, and can be viewed by all users. 
  -To create a review, a user must first Register for an account and Log In (see User model)
*/

// Require Mongoose
const mongoose = require('mongoose');

// Review Schema
const reviewSchema = mongoose.Schema({

  // Review title
  title: {
    type: String,
  },

  // Review comment/description
  comment: {
    type: String,
  },

  // Review score/rating (out of 5)
  stars: {
    type: Number,
  },

  // Restaurant ID (Foreign Key to Restauarant)
  restaurant_id: {
    type: String,
  },

  // User ID (Foreign Key to User)
  user_id: {
    type: String,
  },

   // User name
   user_name: {
    type: String,
  },

  // Review image(s) (Uploaded by any user with an account)
  image: [{
    type: String
  }]
  
});

const Review = module.exports = mongoose.model('Review', reviewSchema);