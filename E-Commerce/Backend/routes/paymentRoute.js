const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();

// Payment
router.route("/payment").post(processPayment);

//Send Stripe API Key
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;
