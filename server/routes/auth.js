const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// your two route definitions go here
router.route("/signup").post(signup);
router.route("/login").post(login);

module.exports = router;