const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

const sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  console.log("stripeApi:::::::::::::::::::::::::::::::::::::");
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  // console.log(
  //   "this is from payment Controllers striptApi ::::::::::::",
  //   process.env.STRIPE_SECRET_KEY
  // );
});

module.exports = { processPayment, sendStripeApiKey };
