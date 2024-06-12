const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create New Order
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  console.log("reqUser:::::::", req.user._id);
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

//GET Single Order
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate({
    path: "user",
    select: "name email",
    options: { strictPopulate: false },
  });

  if (!order) {
    next(new Errorhandler("Order Not Found With This ID", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//GET Logged In User Orders
const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//GET All Orders
const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });
  res.status(200).json({
    success: true,
    orders,
  });
});

//Update  Order Status --Admin
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id);

  if (!order) {
    next(new Errorhandler("Order Not Found with this Id", 400));
  }

  if (order.orderStatus === "Delivered") {
    next(new Errorhandler("You have already deliverd this order ", 400));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;
  console.log("req.body:::::", req.body);
  console.log("order:::::", order);

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  res.status(200).json({
    success: true,
    message: order.orderStatus,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

//Delete Order === Admin
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    next(new Errorhandler("Order Not Found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
