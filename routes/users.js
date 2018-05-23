const express = require('express');
const router = express.Router();

// Bring in User controller
let users_controller = require('../controllers/usersController');

// Register User [GET]
router.get('/signup', users_controller.signup);


module.exports = router;
