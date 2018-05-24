const express = require("express");
const router = express.Router();

// Bring in User controller
let users_controller = require("../controllers/usersController");

// Register User [GET]
router.get("/signup", users_controller.signup);

router.post("/register", users_controller.register);

// Login User [GET]
router.get("/login", users_controller.login);

module.exports = router;
