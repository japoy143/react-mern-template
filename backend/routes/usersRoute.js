const express = require("express");
const route = express.Router();
const verify = require("../middleware/verifyJWT");

const {
  signUpUser,
  findUser,
  getAllUser,
  loginUser,
  logoutUser,
  updateUser,
  handleRefreshToken,
  deleteUser,
} = require("../controllers/usersController");

//signup account
route.post("/SignUp", signUpUser);

//login user
route.post("/Login", loginUser);

//handle refresh
route.get("/Refresh", handleRefreshToken);

//get user
route.get("/All", verify, getAllUser);

//find user
route.get("/Find", findUser);

//logout user
route.get("/Logout", logoutUser);

//update user
route.patch("/:id", verify, updateUser);

//delete user
route.delete("/:id", verify, deleteUser);

module.exports = route;
