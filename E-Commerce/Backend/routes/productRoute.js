const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
  getSearchedProducts,
} = require("../controllers/productController");

const router = express.Router();

// GET ALL PRODUCTS
router.route("/products").get(getAllProducts);

// CREATE NEW PRODUCT
router.route("/admin/product/new").post(isAuthenticatedUser, createProduct);

// UDATE A PRODUCT,DELETE A PRODUCT,  (ADMIN)--------------------------
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct) //UPDATE A PRODUCT
  .delete(isAuthenticatedUser, deleteProduct); //DELETE A PRODUCT

//GET A PRODUCT
router.route("/product/:id").get(getProductDetails);

//SEARCH PRODUCT
router.route("/products/search").get(getSearchedProducts);

//CREATE REVIEW UPDATE REVIEW
router.route("/review").put(isAuthenticatedUser, createProductReview);

//Get Product Reviews AND Delete
router
  .route("/reviews")
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteProductReviews);

module.exports = router;
