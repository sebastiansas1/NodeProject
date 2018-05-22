const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/tut1');
let db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

// Init App
const app = express();

// Bring in Models
let Restaurant = require('./models/restaurant');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set Public Folder
app.use(express.static('public'));

// Home Route
app.get('/', function (req, res) {
  Restaurant.find({}, function(err, restaurants){
    if(err){
      console.log(err);
    } else {
      res.render('restaurant/index', {
        title: 'All Restaurants',
        restaurants: restaurants
      });
    }
  });
});

// Route Files
let restaurants = require('./routes/restaurants');

app.use('/restaurants', restaurants);

// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000')
});