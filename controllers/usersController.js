const bcrypt = require('bcryptjs');
// Bring in User model
let User = require('../models/user');

exports.signup = function(req, res){
  res.render('user/signup');
};

exports.register = function(req, res){
  console.log('Hey I am in controller now');
  const email = req.body.email;
  const password = req.body.password;
  const c_password = req.body.c_password;

  if( password == c_password ){
    let user = new User({
      email:email,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }

        user.password = hash;
        user.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            console.log('It worked');
            res.render('user/login');
          }
        });

      });
    });

  } else {
    res.render('user/signup');
    console.log('Passwords do not match boy!')
  }

};

exports.login = function(req, res){
  res.render('user/login');
};

