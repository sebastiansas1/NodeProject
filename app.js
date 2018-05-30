const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const config = require('./config/db');


mongoose.connect(config.database);
let db = mongoose.connection;

// Check connection
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Check for DB errors
db.on("error", function (err) {
  console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Restaurant = require("./models/restaurant");
let Review = require("./models/review");

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

// Set Public Folder
app.use(express.static("public"));
app.use('/static', express.static('public'));


// Messages Configuration
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport Configuration
require('./config/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Home Route
app.get("/", function (req, res) {
  var reviews = [];
  var rest = [];
  Restaurant.find({}, function (err, restaurants) {
    if (err) {
      console.log(err);
    }
    else {
      Review.find({}, function(err2, reviews){
        if(err2){
          console.log(err2);

        }
        else{
          res.render("restaurant/index", {
            title: "All restaurants ",
            restaurants: restaurants,
            reviews: reviews
          });
        }
      })
    // rest.push(restaurants);
    // for (var i = 0; i < rest.length; i++) {
    //   console.log("  ");
    //   console.log("foreach id = " + i);
    //   console.log("rest id = " + restaurants[i]._id);
    //   var rest_id = restaurants[i]._id;
    //   rest.push(restaurants[i]);
    //   Review.find({ restaurant_id: rest_id }, function (err2, review) {
    //     if (err2) {
    //       console.log(err2);
    //     }
    //     else {
    //       for (var j = 0; j < review.length; j++) {
    //         console.log("got review ");
    //         console.log("review= " + review[j]);
    //         reviews.push(review[j]);
    //         console.log("pushing array");
    //         console.log("array length ");
    //         console.log(reviews.length);
    //         console.log("--------------------------------")
            
    //         if(review[j] == review[review.length-1]){
    //           console.log("last item ALLLEEERRTT" + review.length);
             
    //         }
    //       };
    //     }
        
  
    //   });    
    // };
    
    }
  });


  
});

//Search Route
app.get("/search/:search_query", function (req, res) {
  let search = req.params.search_query;
  var name = { name: new RegExp(search, "i") };
  var city = { city: new RegExp(search, "i") };
  Restaurant.find({ $or: [name, city] }, function (err, restaurants) {
    if (err) {
      console.log(err);
    } else {
      res.render("restaurant/index", {
        title: "Search result for " + search,
        restaurants: restaurants
      });
    }
  });
});

// Require All Routes
let restaurants = require("./routes/restaurants");
let reviews = require("./routes/reviews", { mergeParams: true });
let uploads = require("./routes/uploads", { mergeParams: true });
let users = require("./routes/users");

// Controller requires
let autocomplete = require("./controllers/restaurantsController");

// Google maps Configuration
require('./config/map');

// Routes definitions
app.use("/restaurants", restaurants);
restaurants.use('/:restaurant_id/reviews', reviews);
restaurants.use('/:restaurant_id/upload', uploads);
app.get("/autocomplete/:search", autocomplete.find);
app.use("/users", users);

// Start Server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
