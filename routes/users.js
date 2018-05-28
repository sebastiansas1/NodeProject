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

router.post('/login', function(req, res, next) {
  req.flash('Wassup Man!');
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req,res,next);
});

// Export Router Paths
module.exports = router;
