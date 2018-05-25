// Bring in Restaurant model
let Restaurant = require("../models/restaurant");

// Setup Restaurant Method [for GET]
exports.add = function(req, res) {
  res.render("restaurant/add", {
    title: "Add Restaurant"
  });
};

// Create Restaurant Method [for POST]
exports.create = function(req, res) {
  let restaurant = new Restaurant();
  restaurant.name = req.body.name;
  restaurant.addressLine1 = req.body.addressLine1;
  restaurant.addressLine2 = req.body.addressLine2;
  restaurant.city = req.body.city;
  restaurant.county = req.body.county;
  restaurant.country = req.body.country;
  restaurant.postcode = req.body.postcode;
  restaurant.phoneNumber = req.body.phoneNumber;
  restaurant.website = req.body.website;
  restaurant.cuisine = req.body.cuisine;
  restaurant.description = req.body.description;

  restaurant.save(function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash('success', 'Restaurant Added!');
      res.sendStatus(200);
    }
  });
};

// Edit Restaurant Method [for GET]
exports.edit = function(req, res) {
  Restaurant.findById(req.params.id, function(err, restaurant) {
    res.render("restaurant/edit", {
      title: "Edit Restaurant",
      restaurant: restaurant
    });
  });
};

// Update Restaurant Method [for POST]
exports.update = function(req, res) {
  let restaurant = {};
  restaurant.name = req.body.name;
  restaurant.addressLine1 = req.body.addressLine1;
  restaurant.addressLine2 = req.body.addressLine2;
  restaurant.city = req.body.city;
  restaurant.county = req.body.county;
  restaurant.country = req.body.country;
  restaurant.postcode = req.body.postcode;
  restaurant.phoneNumber = req.body.phoneNumber;
  restaurant.website = req.body.website;
  restaurant.cuisine = req.body.cuisine;
  restaurant.description = req.body.description;

  let query = { _id: req.params.id };

  Restaurant.update(query, restaurant, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/restaurants/" + req.params.id);
    }
  });
};

// Show Restaurant Method [for GET]
exports.show = function(req, res) {
  Restaurant.findById(req.params.id, function(err, restaurant) {
    res.render("restaurant/show", {
      restaurant: restaurant
    });
  });
};

// Show Restaurant through search Method [for GET]
exports.display = function(req, res) {
  Restaurant.findOne({ name: req.params.name }, function(err, restaurant) {
    res.render("restaurant/show", {
      restaurant: restaurant
    });
  });
};

// Delete Restaurant Method [for DELETE]
exports.delete = function(req, res) {
  let query = { _id: req.params.id };
  Restaurant.remove(query, function(err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
};

exports.find = function(req, res) {
  var search = req.params.search;
  var name = { name: new RegExp(search, "i") };
  var city = { city: new RegExp(search, "i") };
  Restaurant.find({ $or: [name, city] }, function(err, items) {
    res.jsonp(items);
  });
};

//
exports.upload = function(req, res) {
  Restaurant.findById(req.params.id, function(err, restaurant) {
    res.render("restaurant/upload", {
      title: "Upload Image for Restaurant",
      id: req.params.id,
      restaurant: restaurant
    });
  });
};

//
// exports.photos = function(req, res) {
//   console.log("reached photos controller, YAAY ");
//   Restaurant.findById(req.params.id, function(err, restaurant) {
//     res.render("restaurant/upload", {
//       title: "Upload Image for Restaurant",
//       restaurant: restaurant
//     });
//   });
// };

// exports.delete_photo = function(req, res){
//   console.log("trying to delete photo");
//   let query = { _id: req.params.id };
// }