const express = require('express');

const router = express.Router();
const { register, loginUser, logoutUser } = require('../controllers/userController');

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);

module.exports = router;