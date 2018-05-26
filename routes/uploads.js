const express = require("express");
const router = express.Router();

// Bring in Multer configuration
let multer = require('../config/multer');

// Bring in Upload Controller
let uploads_controller = require("../controllers/uploadsController");

// Upload Images [GET] 
router.get("/", uploads_controller.manage);

//Upload Image [POST]
router.post('/', multer.configuration, uploads_controller.upload);

// Delete Image [DELETE]
router.post("/delete/:id", uploads_controller.delete);

// Export Router Paths
module.exports = router;
