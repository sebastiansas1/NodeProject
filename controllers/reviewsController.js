/*
  - Reviews Controller containing the methods to add and delete reviews. 
  - Includes GET, POST and DELETE methods required. 
*/

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
  var path_image = [];
  let review = new Review();

  review.title = req.body.title;
  review.comment = req.body.comment;
  review.stars = req.body.stars;
  review.restaurant_id = req.originalUrl.split('/')[2];
  review.user_id = req.body.user_id;
  review.user_name = req.body.user_name;
  
  //check if there is an image for the review 
  if(req.files.length == 0) {
    // Throw error message
    console.log("submtting review without image to review");
  } else {
    for (var i = 0; i < req.files.length; i++) {
      var storage = 'static/uploads/' + req.files[i].filename;
      path_image.push(storage);
      review.image = path_image;
    }
  } 
  review.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
};

// Remove Review Method [for POST]
exports.remove = function (req, res) {
  var fullUrl = req.originalUrl;
  var restaurant_id = fullUrl.split('/')[2];
 
  let query = {
    _id: req.params.id
  };
  Review.remove(query, function (err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
  
   
  
};