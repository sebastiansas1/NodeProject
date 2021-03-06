/*
  - Restauarants Controller containing the methods to find, add, edit, search and delete restaurants. 
  - Includes GET, POST and DELETE methods required. 
*/

// Bring in Restaurant & Review Models
let Restaurant = require("../models/restaurant");
let Review = require("../models/review");

// Index Method [for GET]
exports.index = function(req, res) {
  var reviews = [];
  var rest = [];

  // Parsing the model to find all restauarants, as no parameters are included in search function
  Restaurant.find({}, function(err, restaurants) {
    if (err) {
      console.log(err);
    } else {
      Review.find({}, function(err2, reviews) {
        if (err2) {
          console.log(err2);
        } else {
          res.locals.user = req.user;
          res.render("restaurant/index", {
            title: "All restaurants ",
            restaurants: restaurants,
            reviews: reviews
          });
        }
      });
    }
  });
};

// Setup Restaurant Method [for GET]
exports.add = function(req, res) {
  res.render("restaurant/add", {
    title: "Add Restaurant",
    message: req.flash("message")
  });
};

// Create Restaurant Method [for POST]
exports.create = function(req, res) {
  let restaurant = new Restaurant();
  restaurant.name = req.body.name;
  restaurant.nr = req.body.nr;
  restaurant.street = req.body.street;
  restaurant.city = req.body.city;
  restaurant.county = req.body.county;
  restaurant.country = req.body.country;
  restaurant.postcode = req.body.postcode;
  restaurant.phoneNumber = req.body.phoneNumber;
  restaurant.website = req.body.website;
  restaurant.cuisine = req.body.cuisine;
  restaurant.description = req.body.description;

  restaurant.save(function(err, object) {
    if (err) {
      req.flash("danger", "Fields Required!");
      return res.status(200).send({
        result: "fields_missing",
        message: req.flash("message")
      });
    } else {
      // Confirmation Flash message to user
      req.flash("success", "Restaurant created. Please upload official pictures of your restaurant.");
      return res.status(200).send({
        result: "redirect",
        url: "/restaurants/" + object._id + "/upload",
        message: req.flash("message")
      });
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
  restaurant.nr = req.body.nr;
  restaurant.street = req.body.street;
  restaurant.city = req.body.city;
  restaurant.county = req.body.county;
  restaurant.country = req.body.country;
  restaurant.postcode = req.body.postcode;
  restaurant.phoneNumber = req.body.phoneNumber;
  restaurant.website = req.body.website;
  restaurant.cuisine = req.body.cuisine;
  restaurant.description = req.body.description;

  let query = {
    _id: req.params.id
  };

  Restaurant.update(query, restaurant, function(err) {
    if (err) {
      req.flash("danger", "Fields Required!");
      return res.status(200).send({
        result: "fields_missing",
        message: req.flash("message")
      });
    } else {
      req.flash("success", "Restaurant Successfully modified!");
      return res.status(200).send({
        result: "redirect",
        url: "/restaurants/" + req.params.id,
        message: req.flash("message")
      });
    }
  });
};

// Show Restaurant Method [for GET]
exports.show = function(req, res) {
  Restaurant.findById(req.params.id, function(err, restaurant) {
    if (req.params.id != null) {
      var query = {
        restaurant_id: restaurant._id
      };
    }
    Review.find(query, function(err, reviews) {
      res.render("restaurant/show", {
        restaurant: restaurant,
        reviews: reviews,
        message: req.flash("message")
      });
      // res.end(req.params.id);
    });
  });
};

// Show Restaurant through search Method [for GET]
exports.display = function(req, res) {
  Restaurant.findOne(
    {
      name: req.params.name
    },
    function(err, restaurant) {
      var query = {
        restaurant_id: restaurant.id
      };
      Review.find(query, function(err, reviews) {
        res.redirect("/restaurants/" + restaurant.id);
      });
    }
  );
};

// Delete Restaurant Method [for DELETE]
exports.delete = function(req, res) {
  let query = {
    _id: req.params.id
  };
  Restaurant.remove(query, function(err) {
    if (err) {
      console.log(err);
    }
    res.send("Success");
  });
};

// Find Restaurant with Search [for GET]
exports.find = function(req, res) {
  var search = req.params.search;
  var name = {
    name: new RegExp(search, "i")
  };
  var city = {
    city: new RegExp(search, "i")
  };
  var cuisine = {
    cuisine: new RegExp(search, "i")
  };
  Restaurant.find(
    {
      $or: [name, city, cuisine]
    },
    function(err, items) {
      res.jsonp(items);
    }
  );
};

// Search for a Restaurant [for ?]
exports.search = function(req, res) {
  let search = req.params.search_query;
  var name = {
    name: new RegExp(search, "i")
  };
  var city = {
    city: new RegExp(search, "i")
  };
  var cuisine = {
    cuisine: new RegExp(search, "i")
  };
  Restaurant.find(
    {
      $or: [name, city, cuisine]
    },
    function(err, restaurants) {
      if (err) {
        console.log(err); // Comment to console for debugging
      } else {
        Review.find({}, function(err2, reviews) {
          res.render("restaurant/index", {
            title: "Search result for " + search,
            restaurants: restaurants,
            reviews: reviews
          });
        });
      }
    }
  );
};

// Authenticate user
exports.authenticate = function(req, res, next) {
  res.locals.user = req.user || null;
  next();
};
