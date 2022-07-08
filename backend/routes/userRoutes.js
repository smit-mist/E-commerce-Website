const express = require('express');

const router = express.Router();
const { register, loginUser, logoutUser, forgotPassword } = require('../controllers/userController');

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);

module.exports = router;