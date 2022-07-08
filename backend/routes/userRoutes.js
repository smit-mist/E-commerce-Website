const express = require('express');

const router = express.Router();
const { register, loginUser, logoutUser, forgotPassword, resetPassword } = require('../controllers/userController');

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
module.exports = router;