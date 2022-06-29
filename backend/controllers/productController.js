const Product = require("../models/productModel")


const createProduct = async(req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
};

const getAllProducts = (req, res) => {
    res.status(200).json({ message: "Get All Products" });
};

module.exports = { getAllProducts, createProduct };