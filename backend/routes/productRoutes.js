const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const router = express.Router();
const { isAuthenticatedUser, authorizedUser } = require('../middleware/auth');

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizedUser("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizedUser("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizedUser("admin"), deleteProduct)
    .get(getProductDetails);

module.exports = router;