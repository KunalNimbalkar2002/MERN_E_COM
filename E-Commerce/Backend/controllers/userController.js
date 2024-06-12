const User = require("../models/userModel");
const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const { use } = require("../routes/userRoutes");

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

//Forgot Password

const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User Not Found", 404));
  }

  //Get Reset Password Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your Password Reset Token Is :- \n\n ${resetPasswordUrl} \n\n If You Have Not Requested This Email Then Please Ignore It `;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email Sent To ${req.user} Successfully!!!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

//RESET PASSWORD
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  //Creating Token Hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new Errorhandler(
        "Reset Password Token is Invalid O Has Been Expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmpassword) {
    return next(new Errorhandler("Password Does Not Mtch"));
  }

  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// Get my details

const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  console.log("userr::::::::::", user);

  if (!user) {
    return next(new Errorhandler("User not found", 404));
  }

  res.json(user);
});

//Update User Password

const updateUserPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Password Does not Match Old Password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password Does not Match ", 400));
  }
  user.password = req.body.newPassword;
  user.save();

  sendToken(user, 200, res);
});

// Update User Profile

const updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  // Avatar will Update Later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    message: "Profile Updated Sucessfully",
  });
});

// Get All Users
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// Get single User (ADMIN)
const getAllUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  console.log("userr::::::::::", user);

  if (!user) {
    return next(
      new Errorhandler("User does not exist with id ${req.params.id}", 404)
    );
  }

  res.json(user);
});

// Update User Role  --Admin
const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "User Role Updated Sucessfully",
  });
});

// Delete User   --Admin
const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler("User does not exist with id ${req.params.id}", 404)
    );
  }

  await user.deleteOne();

  res.status(200).json({
    message: "User Deleted  Sucessfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateUserProfile,
  getAllUsers,
  getAllUserDetails,
  updateUserRole,
  deleteUser,
};
