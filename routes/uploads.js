const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Bring in Multer configuration
let multer = require('../config/multer');

// Bring in Upload Controller
let uploads_controller = require("../controllers/uploadsController");

// Upload Images [GET] 
router.get("/", passport.isAuthorised, uploads_controller.manage);

//Upload Image [POST]
router.post('/', multer.configuration, uploads_controller.upload);

// Delete Image [DELETE]
router.post("/delete/:id", passport.isAuthorised, uploads_controller.delete);

// Export Router Paths
module.exports = router;
