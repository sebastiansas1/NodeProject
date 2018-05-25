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

// Login process
router.post('/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true  
  })(req, res, next);
});

// router.post('/login', function(req, res, next) {
//   console.log(req.body);
//   console.log(next);
//   passport.authenticate('local', function(err, user, info) {
//     console.log(user);
//     if (err) { return next(err); }
//     console.log(info);
//     if (!user) { 
//       return res.redirect('/users/login'); 
//     }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }

//       return res.redirect('/');
//     });
//   })(req, res, next);
// });

module.exports = router;
