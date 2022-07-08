const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
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
module.exports = { register, loginUser, logoutUser, forgotPassword };