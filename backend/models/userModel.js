const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Provide Name'],
        maxLength: [30, 'Name should be atmost 30 chars'],
        minLength: [4, 'Name should be atleast 4 chars'],

    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please enter email'],
        validate: [validator.isEmail, 'Please enter valid email'],

    },
    password: {
        type: String,
        require: [true, 'Provide Password'],
        minLength: [4, 'Password should be atleast 8 chars'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user",

    },
    resetPasswordString: String,
    resetPasswordExpire: Date,

});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs.hash(this.password, 10);
})

userSchema.methods.getJWTToken = function() {
    return jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

userSchema.methods.comparePassword = async function(enteredPass) {
    return await bcryptjs.compare(enteredPass, this.password);
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordString = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;

}
module.exports = mongoose.model("User", userSchema);