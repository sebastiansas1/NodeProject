const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
  
  // // Local Strategy
  passport.use(new LocalStrategy({

      usernameField: 'email',
      passwordField: 'password'

    },

    function (email, password, done) {
      // passReqToCallback: true;
      User.findOne({
        email: email
      }, function (err, user) {
        if (err) throw err;
        if (!user) {
          console.log('NO USER FOUND');
          return done(null, false, {
            message: 'No user found!'
          });
        }
        // Match Password
        bcrypt.compare(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            console.log('YOU MAY LOG IN BIATCH');
            return done(null, user);
          } else {
            console.log('WRONG PASSWORD');
            return done(null, false, {
              message: 'Wrong password!'
            });
          }
        });
      });
    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}