const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please, provide name of the product'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide description']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        maxLength: [8, 'Price cannot exceed 8 characters']
    },
    rating: {
        type: Number,
        defaul: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "Category Required"],
    },
    stock: {
        type: Number,
        required: [true, "Please provide stock"],
        maxLength: [4, "Stock cannot exceed 4 digit"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        commment: {
            type: String,
            required: true,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model("Product", productSchema);