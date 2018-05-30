const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Bring in Restaurant Model & Controller
let restaurants_controller = require("../controllers/restaurantsController");

// ROUTES DEFINITIONS BELOW

// Add Restaurant [GET]
router.get("/add", passport.isAuthorised, restaurants_controller.add);

// Create Restaurant [POST]
router.post("/add", passport.isAuthorised, restaurants_controller.create);

// Edit Restaurant [GET]
router.get("/:id/edit", passport.isAuthorised, restaurants_controller.edit);

// Edit Restaurant [POST]
router.post("/:id/edit", passport.isAuthorised, restaurants_controller.update);

// Show Restaurant [GET]
router.get("/:id", restaurants_controller.show);

// Show Restaurant, through name search [GET]
router.get("/search_query/:name", restaurants_controller.display);

// Delete Restaurant [DELETE]
router.delete("/:id", passport.isAuthorised, restaurants_controller.delete);

// Export Router Paths
module.exports = router;