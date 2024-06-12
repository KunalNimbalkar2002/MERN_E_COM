const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/userController");

const { isAuthenticatedUser } = require("../middleware/auth");

//Register A User
router.route("/register").post(registerUser);

//Login User
router.route("/login").post(loginUser);

//Forgot Password
router.route("/password/forgot").post(forgotPassword);

//Reset Password
router.route("/password/reset/:token").post(resetPassword);

//Logout User
router.route("/logout").get(logoutUser); //errorrrr

//Get User Details
router.route("/me").get(isAuthenticatedUser, getUserDetails);

//Update User Password
router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);

//Update User Details
router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

//Get All Users  (ADMIN)---------------------------------------------
router.route("/admin/users").get(isAuthenticatedUser, getAllUsers);

//Get Single User By ID (Admin)-----------------------------------------
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, getAllUserDetails)
  .put(isAuthenticatedUser, updateUserRole)
  .delete(isAuthenticatedUser, deleteUser);

module.exports = router;
