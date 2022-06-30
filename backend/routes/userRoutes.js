const express = require('express');

const router = express.Router();
const { register, loginUser } = require('../controllers/userController');

router.route("/register").post(register);
router.route("/login").post(loginUser);

module.exports = router;