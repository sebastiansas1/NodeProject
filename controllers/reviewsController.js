// Bring in Review Model
let Review = require("../models/review");

// Add Review Method [for GET]
exports.add = function (req, res) {
  res.render("review/add", {
    title: "Add Review"
  });
};

// Create Review Method [for POST]
exports.create = function (req, res) {
  var fullUrl = req.originalUrl;
  var restaurant_id = fullUrl.split('/')[2];
  let review = new Review();
  review.title = req.body.title;
  review.comment = req.body.comment;
  review.stars = req.body.stars;
  review.restaurant_id = restaurant_id;

  review.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
};