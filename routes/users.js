const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in User controller
let users_controller = require("../controllers/usersController");

// Register User [GET]
router.get("/signup", users_controller.signup);

router.post("/register", users_controller.register);

// Login User [GET]
router.get("/login", users_controller.login);

router.post('/login', function (req, res, next) {

  if (req.session.returnTo == undefined) {
    var path = "/";
  } else {
    var path = req.session.returnTo;
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }

    if (!user) {
      req.flash('danger', 'User not found');
      return res.status(200).send({
        result: 'fields_missing',
        message: req.flash('message')
      });
    }

    // req / res held in closure
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      } else {
        req.flash('success', 'Welcome back ' + user.email.split('@')[0]);
        return res.status(200).send({
          result: 'redirect',
          url: path,
          message: req.flash('message')
        });
      }
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  delete req.session.returnTo;
  req.flash('success', "See you soon!");
  res.redirect('/users/login');
});

// Export Router Paths
module.exports = router;