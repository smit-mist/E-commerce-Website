const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getAdminProducts,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser, authorizedUser } = require("../middleware/auth");

router.route("/products").get(getAllProducts);
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizedUser("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizedUser("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedUser("admin"), deleteProduct)
  .get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReviews);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizedUser("admin"), getAdminProducts);
module.exports = router;
