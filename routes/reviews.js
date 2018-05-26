const express = require("express");
const router = express.Router();

// Bring in Review Controller
let reviews_controller = require("../controllers/reviewsController");

// Add Review [GET]
router.get("/add", reviews_controller.add);

// Create Review [POST]
router.post("/add", reviews_controller.create);

// Export Router Paths
module.exports = router;
