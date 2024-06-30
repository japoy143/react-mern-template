const mongoose = require("mongoose");
const user = require("../models/usersModel");

require("dotenv").config();

//encryption
const bcrypt = require("bcrypt");

//jwt
const jwt = require("jsonwebtoken");

//signup user
const signUpUser = async (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // find if the email is already taken
  const foundUser = await user.findOne({ email });

  if (foundUser) return res.status(201).json("Email is Already Taken");

  try {
    const signUp = await user.create({
      email: email,
      password: hashedPassword,
    });
    return res
      .status(200)
      .json({ Message: "Sign Up Successfully", email: email });
  } catch (error) {
    return res.status(400).json("Sign Up Failed");
  }
};

//get all user
const getAllUser = async (req, res) => {
  try {
    const users = await user.find({}).sort({ createdAt: -1 });
    return res.status(200).json({ Message: "Data Fetch", users });
  } catch (error) {
    return res.status(404).json({ Message: "Fetching Data Failed" });
  }
};

//find user
const findUser = async (req, res) => {
  const { email } = req.body;

  const userFound = await user.findOne({ email });

  // if user not found
  if (!userFound) return res.status(201).json("User Not Found");

  return res.status(200).json({ id: userFound._id, email: userFound.email });
};

//generate token function
const generateToken = (user, secretKey, expireTime) => {
  return jwt.sign({ id: user.id, email: user.email }, `${secretKey}`, {
    expiresIn: expireTime,
  });
};

//user validation and generate token for user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userFound = await user.findOne({ email });
  // if user not found
  if (!userFound) return res.json("Not Found");

  //compare if the same password with the email found
  const isMatch = await bcrypt.compare(password, userFound.password);

  if (isMatch) {
    //generate access token for user with 15minutes expiry
    const accessToken = generateToken(
      userFound,
      process.env.ACCESS_TOKEN_SECRET,
      "15m"
    );
    //generate refresh token for user with  15hours expiry
    const refreshToken = generateToken(
      userFound,
      process.env.REFRESH_TOKEN_SECRET,
      "15h"
    );

    //save token in cookies
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    //successfully generate tokens and user found
    return res.status(200).json({
      Message: "Success",
      id: userFound._id,
      email: email,
      accessToken,
    });
  } else {
    return res.status(201).json("Incorrect Password");
  }
};

//logout user
const logoutUser = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // token not found and not same
  if (!refreshToken) return res.status(403).json("Invalid Token");
  //remove token in the cookies
  res.clearCookie("refreshToken");

  return res.status(200).json("You Logout Successfully");
};

//update user
const updateUser = async (req, res) => {
  const { id } = req.params;

  //if id not thesame
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json("Invalid Id");

  const User = await user.findByIdAndUpdate({ _id: id }, { ...req.body });

  //user not found
  if (!User) return res.status(404).json("Data Not Updated");

  return res.status(200).json("User Updated Successfully");
};

//refresh token
const handleRefreshToken = async (req, res) => {
  //take the resfreshToken  from the user cookies
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json("Not Authenticated");

  //verify if the token expired and will generate a new tokens
  jwt.verify(
    refreshToken,
    `${process.env.REFRESH_TOKEN_SECRET}`,
    (err, user) => {
      if (err) {
        res.clearCookie("refreshToken");
        return res.status(403).json("Refresh token expired or invalid");
      }

      //new tokens
      const newAccessToken = generateToken(
        user,
        process.env.ACCESS_TOKEN_SECRET,
        "15m"
      );

      const newRefreshToken = generateToken(
        user,
        process.env.REFRESH_TOKEN_SECRET,
        "15h"
      );
      //pass refresh token
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
      });

      //pass access token
      return res.status(200).json({ accessToken: newAccessToken });
    }
  );
};

//delete user

const deleteUser = async (req, res) => {
  const { id } = req.params;
  //if id not thesame
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ Message: "Invalid Id" });

  const User = await user.findByIdAndDelete({ _id: id });

  //if user not found
  if (!User) return res.status(404).json({ Message: "Data Not Deleted" });

  return res.status(200).json({ Message: "Data Deleted Successfully", User });
};

module.exports = {
  signUpUser,
  getAllUser,
  findUser,
  loginUser,
  logoutUser,
  updateUser,
  handleRefreshToken,
  deleteUser,
};
