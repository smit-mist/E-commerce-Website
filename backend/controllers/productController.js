const getAllProducts = (req, res) => {
    res.status(200).json({ message: "Get All Products" });
};

module.exports = getAllProducts;