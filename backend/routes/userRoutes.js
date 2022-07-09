const express = require('express');

const router = express.Router();
const {
    register,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserProfile,
    deleteUser
} = require('../controllers/userController');
const { isAuthenticatedUser, authorizedUser } = require('../middleware/auth');

router.route("/register").post(register);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizedUser("admin"), getAllUser);

router.route("/admin/user/:id").get(isAuthenticatedUser, authorizedUser("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizedUser("admin"), updateUserProfile)
    .delete(isAuthenticatedUser, authorizedUser("admin"), deleteUser);

module.exports = router;