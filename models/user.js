/*
  -Model for a User, outlining the database schema.
  -A user must create an account before in order to: Add/Edit/Delete Restaurants and Add/Edit/Delete Reviews.
*/

// Require Mongoose
const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  // Email address (required to log in)
  email: {
    type: String,
    required: true,
    unique:true // Cannot create an account with an email address already used. 
  },

  // Password for account (required to log in)
  password: {
    type: String,
    required: true
  },

  // User accounts can be made an Admin. Reference: https://github.com/plataformatec/devise/wiki/How-To:-Add-an-Admin-Role
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
  
});


let User = module.exports = mongoose.model('User', userSchema);