const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("check cokkie token::::::::::", token);
  if (!token) {
    next(new Errorhandler("Please Login To Access This Resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRETKEY);

  req.user = await User.findById(decodedData.id);

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Errorhandler(
          `Role ${req.user.role} is not allowed to access the resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = {
  isAuthenticatedUser,
  authorizeRoles,
};
