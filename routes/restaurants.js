const express = require("express");
const router = express.Router();

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

module.exports = router;
