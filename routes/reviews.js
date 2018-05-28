const express = require("express");
const router = express.Router();
// Bring in Multer configuration
let multer = require('../config/multer');

// Bring in Review Controller
let reviews_controller = require("../controllers/reviewsController");

// Add Review [GET]
router.get("/add", reviews_controller.add);

// Create Review [POST]
router.post("/add", multer.configuration, reviews_controller.create);

// Remove Review [POST]
router.post("/remove/:id",  reviews_controller.remove);
// Export Router Paths
module.exports = router;
