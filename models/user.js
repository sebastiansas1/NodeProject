const mongoose = require('mongoose');

// User Schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  // https://github.com/plataformatec/devise/wiki/How-To:-Add-an-Admin-Role
  // Reference for calling this admin
  admin: {
    type: Boolean,
    required: true,
    default: false
  }
});


let User = module.exports = mongoose.model('User', userSchema);