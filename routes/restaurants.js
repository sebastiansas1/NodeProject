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
          var now = new Date();
          var isoString = now.toISOString();
          next(null, file.fieldname + '-' + isoString + '.'+ext);
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
router.post("/upload/delete/:id", (req, res, next) => {
  console.log("here 1: delete method called");
  var param = req.params.id;
  console.log("param = " + param);
  var path = param.split('_')[0];
  console.log("path= " + path);
  var restaurant_id = param.split('_')[1];
  console.log("rest ID = " + restaurant_id);
  
  let query = {_id: restaurant_id};

  var image_path = "public/uploads/" + path;
  console.log("image path =  " + image_path);
  
  Restaurant.findOneAndUpdate(query, { $pull: { restaurantImage: image_path  }}, function(err) {  
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("updated photos");
      fs.unlinkSync(image_path);
      console.log("deleted file locally");
      console.log("Redirecting you to .............." + "/restaurants/upload/" + restaurant_id);
      res.end();
    }
  });


});

module.exports = router;
