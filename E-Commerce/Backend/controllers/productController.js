const Product = require("../models/productModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//Create a Product  --ADMIN
const createProduct = catchAsyncErrors(async (req, res, next) => {
  console.log("reqfrom user to create Product:::::::::::::::", req.body);
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET ALL PRODUCTS
const getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
  });
  console.log("products", products);
});

// GET PRODUCT DETAILS
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  console.log(
    "From ProductControllers for ProducctDetails::::::::::::",
    product
  );
  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }
  res.status(200).json({
    success: true,
    product,
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

// DELETE PRODUCT  --Admin
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

//Create new Review or Update Review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "User is not authenticated" });
  }
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (review.rating = rating), (review.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  //   4 ,5 ,5 , 3   => 16/ 4   = 16answer
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({ success: true });
});

//Get All  Reviews of Product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }

  if (!product.reviews) {
    return res.status(200).json({
      success: true,
      message: "No reviews found for this product",
      reviews: [],
    });
  }

  return res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete  Reviews @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new Errorhandler("Product Not Found", 404));
  }
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  console.log("reviews:::", reviews);
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;
  const numofReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numofReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res.status(200).json({
    success: true,
  });
});
//=====================================================================================================================

//Get Searched Products
const getSearchedProducts = catchAsyncErrors(async (req, res, next) => {
  const q = req.query.q;
  console.log("req.query.q:", q); // Log to verify the received query parameter

  let searchQuery = {};

  if (typeof q === "string" && q.trim() !== "") {
    // capital S WRONG  String should be "string"

    searchQuery = {
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    };
  }

  try {
    console.log("Search query:", searchQuery);
    const results = await Product.find(searchQuery).exec();
    console.log("Search results:", results);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error Searching Data:", error.message);
    res.status(500).json({
      success: false,
      message: "Error Searching Data",
      error: error.message,
    });
  }
});

module.exports = {
  getAllProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getSearchedProducts,
};
