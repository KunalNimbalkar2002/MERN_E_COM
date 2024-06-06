const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

//Register A User
router.route("/register").post(registerUser);

//Login User
router.route("/login").post(loginUser);

//Logout User
router.route("/logout").get(logoutUser);

module.exports = router;
