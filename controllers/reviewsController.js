// Bring in Restaurant model
let Review = require("../models/review");

// Setup Review Method [for GET]
exports.add = function(req, res) {
  console.log("query = " + req.baseUrl.restaurant_id);
  res.render("review/add", {
    title: "Add Review"
  });
};

// Create Review Method [for POST]
exports.create = function(req, res) {
  let review = new Review();
  review.title = req.body.title;
  review.comment = req.body.comment;
  review.score = req.body.score;
  review.restaurant_id = req.body.restaurant_id;
  
  review.save(function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
};
