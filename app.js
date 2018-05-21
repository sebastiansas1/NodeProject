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
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function (req, res) {
  Restaurant.find({}, function(err, restaurants){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title: 'All Restaurants',
        restaurants: restaurants
      });
    }
  });
});

// Get single restaurant
app.get('/restaurant/:id', function(req,res) {
  Restaurant.findById(req.params.id, function(err, restaurant){
    res.render('restaurant', {
      restaurant:restaurant
    });
  });
});

// Add Route
app.get('/restaurants/add', function(req, res) {
  res.render('add_restaurant', {
    title: 'Add Restaurant'
  });
});

// Edit restaurant
app.get('/restaurant/edit/:id', function(req,res) {
  Restaurant.findById(req.params.id, function(err, restaurant){
    res.render('edit_restaurant', {
      title: 'Edit Restaurant',
      restaurant:restaurant
    });
  });
});

// Add Submit POST Route
app.post('/restaurants/add', function(req, res){
  let restaurant = new Restaurant();
  restaurant.name = req.body.name;
  restaurant.cousine = req.body.cousine;
  restaurant.description = req.body.description;

  restaurant.save(function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

// Update Submit POST Route
app.post('/restaurants/edit/:id', function(req, res){
  let restaurant = {}
  restaurant.name = req.body.name;
  restaurant.cousine = req.body.cousine;
  restaurant.description = req.body.description;

  let query = {_id:req.params.id}

  Restaurant.update(query, restaurant, function(err){
    if(err){
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

app.delete('/restaurant/:id', function(req,res){
  let query = {_id:req.params.id}
  Restaurant.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

// Start Server
app.listen(3000, function () {
  console.log('Server started on port 3000')
});