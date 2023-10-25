// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Define routes for user authentication.
router.post('/login', authController.login);
// Add other authentication routes (e.g., registration) as needed.
router.post('/register', authController.register);

module.exports = router;
