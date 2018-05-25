const express = require("express");
const router = express.Router();

// Bring in Review model
let Review = require("../models/review");


// Bring in Review controller
let reviews_controller = require("../controllers/reviewsController");

// Add Review [GET]
router.get("/add", reviews_controller.add);

// Create Review [POST]
router.post("/add", reviews_controller.create);

module.exports = router;
