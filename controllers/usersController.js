// Bring in User model
let User = require('../models/user');

exports.signup = function(req, res){
  res.render('user/signup');
};

