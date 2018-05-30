const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/db');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

module.exports = function (passport) {

  // // Local Strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },

    function (email, password, done) {
      

      var query = {
        email: email
      };
      
      User.findOne(query, function (err, user) {
        if (err) throw err;
        if (!user) {
          console.log('NO USER FOUND');
          // req.flash('alert', 'No user Found!');
          return done(null, false, {
            message: 'No user found!'
          });
        }

        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            // req.flash('success', 'Welcome back ' + email);
            // return res.status(200).send({result: 'redirect', url:'/', message: req.flash('message')});
            console.log('LOGGED IN!');
            // done.flash('success', 'Welcome Back!');
            return done(null, user, {
              message: 'Welcome back ' + user.email
            });
          } else {
            console.log('WRONG PASSWORD');
            // req.flash('alert', 'Wrong Password');
            return done(null, false, {
              message: 'Wrong password!'
            });
          }
        });
      });
    }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}


module.exports.isAuthorised = function (req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    req.flash('info', 'Log in before proceeding');
    res.redirect('/users/login');
  }
}