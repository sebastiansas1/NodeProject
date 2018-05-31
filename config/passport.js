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
          return done(null, false, {
            message: 'No user found!'
          });
        }

        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user, {
              message: 'Welcome back ' + user.name
            });
          } else {
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
    res.locals.user = req.user
    return next();
  } else {
    req.flash('info', 'Log in before proceeding');
    req.session.returnTo = req.originalUrl;
    res.redirect('/users/login');
  }
}