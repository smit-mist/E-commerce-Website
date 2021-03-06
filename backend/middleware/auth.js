const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('./catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAuthenticatedUser = catchAsyncError(async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        console.log("User is not authenticated", req.cookies);
        return next(new ErrorHandler("Please login", 401));
    }
    console.log("User is logged in");
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});

const authorizedUser = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler("You are not authorized!!", 403));
        }
        next();
    };
}

module.exports = { isAuthenticatedUser, authorizedUser };