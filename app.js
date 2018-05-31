/**
 * 
 * @author: Sebastian Sas Mangel, Andreea-Camelia-Simona Berte, Joseph D'Souza
 */

// Require all packages 
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const config = require('./config/db');

// Initialise Application
const app = express();
mongoose.connect(config.database);

// Require Controller (Restaurant)
let restaurant_controller = require('./controllers/restaurantsController');

// Require All Routes (Restauarants, Reviews, Uploads, Users)
let restaurants = require("./routes/restaurants");
let reviews = require("./routes/reviews", {mergeParams: true});
let uploads = require("./routes/uploads", {mergeParams: true});
let users = require("./routes/users");

// Set connection with Database
let db = mongoose.connection;

// Check connection with Database
db.once("open", function () {
  console.log("Connected to MongoDB");
});

// Check for DB errors
db.on("error", function (err) {
  console.log(err);
});

// Load View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Parse application/json
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Session & Cookie Middleware
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Set Public Folder
app.use(express.static("public"));
app.use('/static', express.static('public'));

// Messages Configuration
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(flash());

// Passport Configuration to handle User Registration
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Google Maps Configuration
require('./config/map');

// Routes available on homepage
app.get("/", restaurant_controller.index);
app.get("/search/:search_query", restaurant_controller.search);
app.get('*', restaurant_controller.authenticate);

// Routes definitions
app.use("/restaurants", restaurants);
restaurants.use('/:restaurant_id/reviews', reviews);
restaurants.use('/:restaurant_id/upload', uploads);
app.get("/autocomplete/:search", restaurant_controller.find);
app.use("/users", users);

// Start Server on Local Host (3000)
app.listen(3000, function () {
  console.log("Server started on port 3000");
});