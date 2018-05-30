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

// router.post('/login', function(req, res, next) {
//   console.log(req);
//   passport.authenticate('local', function(err, user, info) {
//     res.sendStatus(999);
//     if (err) { return next(err); }
//     res.sendStatus(999);
//     if (!user) { 
//       res.sendStatus(999);
//       // User does not exist
//       return res.redirect('/users/login'); 
//     }
//     req.logIn(user, function(err) {
//       res.sendStatus(999);
//       if (err) { return next(err); }

//       // User Successfully Logs In!
//       res.sendStatus(999);
//       res.end();
//     });
//   });
// });

router.post('/login', function (req, res, next) {

  console.log(req.body.email);
  console.log(req.body.password);

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
        req.flash('success', 'Welcome back!');
        return res.status(200).send({
          result: 'redirect',
          url: '/',
          message: req.flash('message')
        });
      }
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  req.flash('success', "See you soon!");
  res.redirect('/');
});

// Export Router Paths
module.exports = router;