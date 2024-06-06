const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

//Register A User
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body; //destructuring
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is sample id",
      url: "ProfilePicUrl",
    },
  });

  sendToken(user, 201, res);
});

// Login User

const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //check if user has given email and password both

  if (!email || !password) {
    return next(new Errorhandler("Please Enter Email & Pasword", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid Email or Pasword", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);
  console.log("password:::::::::::::::", password);
  console.log("user.password::::::::::::::", user.password);
  console.log("isPasswordMatched::::::::::", isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Pasword", 401));
  }

  sendToken(user, 200, res);
});

//Logout User

const logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logout Successfully!!",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
