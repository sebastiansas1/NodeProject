/*
  - Users Controller containing the methods to register and login to an account. 
*/

// Require Bcrypt 
const bcrypt = require("bcryptjs");

// Bring in User model
let User = require("../models/user");


exports.signup = function (req, res) {
  res.render("user/register");
};

/**
 * 
 * @param {HTTP Request} req The request containing the registration input fields
 * that will be passed to the User Model. 
 * @param {HTTP Response} res 
 */
exports.register = function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var c_password = req.body.c_password;
  var admin = req.body.admin;

  let user = new User({
    name: name,
    email: email,
    password: password,
    admin: admin
  });

  // Encrypt passwords with hash
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        console.log(err);
      } else {
        user.password = hash;
        user.save(function (err) {
          if (err) {
            if (err.code != 11000) {
              res.status(500).end("ERROR: " + err.code.toString());
              console.log(err);
            }
            // Duplicated key in db collection [Account exists]
            else if (err.code == 11000) {
              res.status(500).end("DB_DUPLICATE_KEY");
              console.log(err);
            }
          } else {
            // Successful registration
            req.flash('success', 'Thank you for register, please use email and password to login');
            return res.status(200).send({
              result: 'post_registration_login',
              message: req.flash('message')
            });
          }
        });
      }
    });
  });
};

// Login [for GET]
exports.login = function (req, res) {
  res.render("user/login");
};