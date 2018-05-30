const bcrypt = require("bcryptjs");
// Bring in User model
let User = require("../models/user");

exports.signup = function (req, res) {
  res.render("user/signup");
};

exports.register = function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const c_password = req.body.c_password;

  let user = new User({
    email: email,
    password: password
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
            res.sendStatus(200);
          }
        });
      }
    });
  });
};

exports.login = function (req, res) {
  res.render("user/login");
};