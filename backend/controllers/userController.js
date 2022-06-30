const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const sendToken = require("../utils/sendToken");

const register = catchAsyncError(async(req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a same id",
            url: "sample url"
        }
    });

    sendToken(user, 201, res);
});

const loginUser = catchAsyncError(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler("Please enter both", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }
    console.log("OK");
    const isPasswordSame = await user.comparePassword(password);
    if (!isPasswordSame) {
        return next(new ErrorHandler("Invalid Email or Password", 401));

    }
    sendToken(user, 200, res);
});

const logoutUser = catchAsyncError(async(req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout Successfull"
    });
});
module.exports = { register, loginUser, logoutUser };