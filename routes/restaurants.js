const express = require('express');
const router = express.Router();

// Bring in Restaurant model
let Restaurant = require('../models/restaurant');


// Add Restaurant [GET]
router.get('/add', function(req, res) {
  res.render('restaurant/add', {
    title: 'Add Restaurant'
  });
});

// Add Restaurant [POST]
router.post('/add', function(req, res){
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

// Edit Restaurant [GET]
router.get('/edit/:id', function(req,res) {
  Restaurant.findById(req.params.id, function(err, restaurant){
    res.render('restaurant/edit', {
      title: 'Edit Restaurant',
      restaurant:restaurant
    });
  });
});

// Edit Restaurant [POST]
router.post('/edit/:id', function(req, res){
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
      res.redirect('/restaurants/'+req.params.id);
    }
  });
});

// Show Restaurant [GET]
router.get('/:id', function(req,res) {
  Restaurant.findById(req.params.id, function(err, restaurant){
    res.render('restaurant/show', {
      restaurant:restaurant
    });
  });
});

// Delete Restaurant [DELETE]
router.delete('/:id', function(req,res){
  let query = {_id:req.params.id}
  Restaurant.remove(query, function(err){
    if(err){
      console.log(err);
    }
    res.send('Success');
  });
});

module.exports = router;
