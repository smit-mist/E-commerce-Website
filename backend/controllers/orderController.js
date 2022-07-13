const Order = require('../models/orderModel');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require('../models/productModel');


const newOrder = catchAsyncError(async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });

});


const getSingleOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");
    if (!order) {
        return next(new ErrorHandler("No order with given ID", 404));
    }
    res.status(200).json({
        success: true,
        order,
    });
});

const myOrder = catchAsyncError(async(req, res, next) => {

    const orders = await Order.find({ user: req.user._id });
    console.log(orders);
    res.status(200).json({
        success: true,
        orders,
    });
});

const getAllOrders = catchAsyncError(async(req, res, next) => {
    const orders = await Order.find();
    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice
    });
    res.status(200).json({
        success: true,
        totalAmount,
        orders,

    });
});

const updateOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("No such product found", 404));
    }
    if (order.orderStatus == "Delivered") {
        return next(new ErrorHandler("This product is already delivered", 404));
    }

    order.orderItems.forEach(async(item) => {
        await updateStock(item.product, item.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }
    await order.save({ validateBeforeSave: false });
    res.status(200).json({ success: true });
});


const deleteOrder = catchAsyncError(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(new ErrorHandler("No such product found", 404));
    }
    await order.remove();
    res.status(200).json({ success: true });
});

module.exports = { newOrder, getSingleOrder, myOrder, getAllOrders, updateOrder, deleteOrder };


async function updateStock(id, quant) {
    const product = await Product.findById(id);
    product.stock -= quant;
    await product.save({ validateBeforeSave: false });
}