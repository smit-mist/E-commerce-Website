const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let product = await apiFeature.query;
  let filteredProductCount = product.length;
  const forPagination = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
   product = await forPagination.query;
  res
    .status(200)
    .json({
      success: true,
      product,
      productCount,
      resultPerPage,
      filteredProductCount,
    });
});


const getAdminProducts = catchAsyncError(async (req, res, next) => {
  const product = await Product.find();
  res
    .status(200)
    .json({
      success: true,
      product,
    });
});
const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found!!!", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true, product });
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found!!!", 404));
  }
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});

const getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found!!!", 404));
  }
  res.status(200).json({ success: true, product });
});

const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  console.log("OK");
  console.log(req.user.id);
  const isReviewed = product.reviews.find(
    (rev) => rev.user && rev.user.toString() === req.user.id
  );
  console.log(isReviewed);
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user && rev.user.toString() == req.user.id) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.rating = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  res.status(200).json({ success: true });
});

const getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
const deleteProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (ele) => ele._id.toString() !== req.query.id.toString()
  );

  console.log(reviews);
  const numOfReviews = reviews.length;
  let avg = 0;
  reviews.forEach((rev) => {
    if (rev.rating) avg += rev.rating;
  });

  const rating = numOfReviews == 0 ? 0 : avg / numOfReviews;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      rating,
      reviews,
      numOfReviews,
    },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
};
