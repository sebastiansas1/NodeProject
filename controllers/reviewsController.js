

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
  console.log("in create review");
  var path_image = [];
  var fullUrl = req.originalUrl;
  var restaurant_id = fullUrl.split('/')[2];
  let review = new Review();
  review.title = req.body.title;
  review.comment = req.body.comment;
  review.stars = req.body.stars;
  review.restaurant_id = restaurant_id;

  console.log("title " + req.body.title);
  console.log("comment " + req.body.comment);
  console.log("stars " + req.body.stars);
  console.log("rest ID " + req.body.restaurant_id);

  console.log("here 1: creating review"); // Comment to console for debugging
  
  //check if there is an image for the review 
  if(req.files.length == 0) {
    // Throw error message
    console.log("submtting review without image to review");
  } else {
    for (var i = 0; i < req.files.length; i++) {
      console.log("file request is " + req.files.filename);
      var storage = 'static/uploads/' + req.files[i].filename;
      path_image.push(storage);
      review.image = path_image;
      console.log("adding image to review"); // Comment to console for debugging
    }
  } 
  review.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("saving ");
      res.redirect("/");
    }
  });
};

// Remove Review Method [for POST]
exports.remove = function (req, res) {
  console.log("in remove review");
  console.log(" delete review for id " + req.params.id);
  
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