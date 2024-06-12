const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderControllers");
const router = express.Router();

//New Order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// Get Single Order
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

//Get LoggedIn User Orders
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

//Get All Orders ------Admin
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
