const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create a Product  --ADMIN
const createProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL PRODUCTS
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 3;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
});

// GET PRODUCT DETAILS
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});

// UPDATE A PRODUCT  -- ADMIN
const updateProduct = catchAsyncErrors(async (req, res) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    product,
  });
});

// DELETE PRODUCT
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  await product.deleteOne();
  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
};
