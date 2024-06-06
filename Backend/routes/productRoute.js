const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const router = express.Router();

// GET ALL PRODUCTS
router.route("/products").get(isAuthenticatedUser, getAllProducts);

// CREATE NEW PRODUCT
router
  .route("/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

// UDATE A PRODUCT,DELETE A PRODUCT,GET SINGLE PRODUCT
router
  .route("/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) //UPDATE A PRODUCT
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) //DELETE A PRODUCT
  .get(getProductDetails); //GET A PRODUCT

module.exports = router;
