const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

const createProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});


const getAllProducts = catchAsyncError(async(req, res) => {
    const resultPerPage = 4;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const product = await apiFeature.query;
    res.status(200).json({ success: true, product, productCount });
});

const updateProduct = catchAsyncError(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not Found!!!", 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id,
        req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        }
    );
    res.status(200).json({ success: true, product });
});


const deleteProduct = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not Found!!!", 404));
    }
    await product.remove();
    res.status(200).json({ success: true, message: "Product Deleted Successfully" });
});

const getProductDetails = catchAsyncError(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler("Product not Found!!!", 404));
    }
    res.status(200).json({ success: true, product });
});
module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails };