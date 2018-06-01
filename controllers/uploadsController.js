/*
  - Uploads Controller containing the methods to add and delete photos. 
  - Includes GET and POST methods required. To delete a picture a post request is sent to update the restaurant
  entity and remove the item from the pictures array. A physical file deletion is also performed to ensure 
  that there are no leftover images.  
*/

const fs = require('fs');

// Bring in Restaurant model
let Restaurant = require("../models/restaurant");

// Upload Manager [GET]
exports.manage = function (req, res) {
  var fullUrl = req.originalUrl;
  var restaurant_id = fullUrl.split('/')[2];
  Restaurant.findById(restaurant_id, function (err, restaurant) {
    res.render("restaurant/upload", {
      title: "Upload Image",
      restaurant: restaurant
    });
  });
}

// Upload Image Method [POST]
exports.upload = function (req, res, next) {
  let restaurant = {};
  var path_image = [];
  var fullUrl = req.originalUrl;
  var restaurant_id = fullUrl.split('/')[2];
  if(req.files.length == 0) {
    // Throw error message
    res.sendStatus(200);
  } else {
    for (var i = 0; i < req.files.length; i++) {
      var storage = 'static/uploads/' + req.files[i].filename;
      path_image.push(storage);
    }
  }

  let query = {
    _id: restaurant_id
  };

  Restaurant.findOneAndUpdate(query, {
    $push: {
      image: path_image
    }
  }, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/restaurants/" + restaurant_id + "/upload");
    }
  });
}

// Delete Image Method [for GET]
exports.delete = function (req, res, next) {
  var param = req.params.id;
  var path = param.split('_')[0];
  var restaurant_id = param.split('_')[1];
  let query = {
    _id: restaurant_id
  };
  var image_path = "public/uploads/" + path;
  var db_image_path = "static/uploads/" + path;

  Restaurant.findOneAndUpdate(query, {
    $pull: {
      image: db_image_path
    }
  }, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      // Deletes file from folder(path)
      fs.unlinkSync(image_path);
      res.end();
    }
  });
}