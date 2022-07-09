const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require('crypto');
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


const forgotPassword = catchAsyncError(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetTok = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetTok}`;
    const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n if you have not requested this email than ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecom Password Recover`,
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`,
        });
    } catch (err) {
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(err.message, 500));
    }
});

const resetPassword = catchAsyncError(async(req, res, next) => {

    const resetPasswordString = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordString,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHandler("Token expired or invalid", 400));
    }
    console.log(user.email);
    if (req.body.pass !== req.body.confirmPass) {
        return next(new ErrorHandler("Password and Confirm Password doesn't matche"));
    }
    console.log(req.body.pass);
    user.password = req.body.pass;
    user.resetPasswordExpire = Date.now();
    user.resetPasswordString = "";
    await user.save();
    sendToken(user, 200, res);
});

const getUserDetails = catchAsyncError(async(req, res, next) => {
    res.status(200).json({ success: true, user: req.user });
});

const updatePassword = catchAsyncError(async(req, res, next) => {
    console.log("ENTRE");
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordSame = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordSame) {
        return next(new ErrorHandler("Please enter correct Old Password", 401));

    }
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password doesn't match with confirm password", 401));
    }
    console.log(req.body.newPassword);
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);
});


const updateProfile = catchAsyncError(async(req, res, next) => {
    const newUserDate = {
        name: req.body.name,
        email: req.body.email,
    }
    const user = await User.findByIdAndUpdate(req.user.id, newUserDate, { new: true, runValidators: true, useFindAndModify: false });
    await user.save();
    res.status(200).json({ success: true });
});

// admin Route
const getAllUser = catchAsyncError(async(req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
});


// admin Route
const getSingleUser = catchAsyncError(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        user
    });
});
module.exports = {
    updateProfile,
    register,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    getAllUser,
    getSingleUser
};