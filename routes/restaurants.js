const express = require("express");
const router = express.Router();
const fs = require("fs");
var multer = require("multer");
// Bring in Restaurant model
let Restaurant = require("../models/restaurant");
const multerConfig = {
    
  storage: multer.diskStorage({
   //Setup where the user's file will go
   destination: function(req, file, next){
     next(null, './public/uploads');
     },   
      
      //Then give the file a unique name
      filename: function(req, file, next){
          console.log(file);
          const ext = file.mimetype.split('/')[1];
          next(null, file.fieldname + '-' + Date.now() + '.'+ext);
        }
      }),   
      
      //A means of ensuring only images are uploaded. 
      fileFilter: function(req, file, next){
            if(!file){
              next();
            }
          const image = file.mimetype.startsWith('image/');
          if(image){
            console.log('photo uploaded');
            next(null, true);
          }else{
            console.log("file not supported");
            
            //TODO:  A better message response to user on failure.
            return next();
          }
      }
    };

// Bring in Restaurant controller
let restaurants_controller = require("../controllers/restaurantsController");

// Add Restaurant [GET]
router.get("/add", restaurants_controller.add);

// Create Restaurant [POST]
router.post("/add", restaurants_controller.create);

// Edit Restaurant [GET]
router.get("/edit/:id", restaurants_controller.edit);

// Edit Restaurant [POST]
router.post("/edit/:id", restaurants_controller.update);

// Show Restaurant [GET]
router.get("/:id", restaurants_controller.show);

// Show Restaurant, through name search [GET]
router.get("/search_query/:name", restaurants_controller.display);

// Delete Restaurant [DELETE]
router.delete("/:id", restaurants_controller.delete);

// Upload images [GET] 
router.get("/upload/:id", restaurants_controller.upload);

//Upload image [POST]
router.post('/upload/:id', multer(multerConfig).array('restaurantImage',5), (req, res, next) => {
  console.log("here 0 file length is " + req.files.length);
  let restaurant = {};
  var path_image = [];
  //console.log("here 2: restaurant length " + restaurant.restaurantImage.length);
  for(var i = 0; i < req.files.length; i++){
    console.log("here 1 for " + i + " : " + req.files[i].filename);
    var storage = 'public/uploads/' +req.files[i].filename;
    console.log("added " + i);
    path_image.push(storage);
}
  console.log("here2: " + path_image);
  console.log("here3: length" + path_image.length);
  console.log("here4: size" + path_image.size);

  //restaurant.restaurantImage = 'public/uploads/' +req.file.filename;

  let query = { _id: req.params.id };
  
  Restaurant.findOneAndUpdate(query, { $push: { restaurantImage: path_image  }}, function(err) {  
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/restaurants/" + req.params.id);
    }
  });
});

//Delete image [DELETE]
router.post("upload/delete", (req, res, next) => {
  console.log("here 1: delete method called");
  var id = req.params.id;
  console.log("ID photo= " + id);
  let query = { _id: req.params.id };
  console.log("query " + query);

});

module.exports = router;
