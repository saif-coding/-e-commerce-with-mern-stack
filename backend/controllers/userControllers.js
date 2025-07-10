const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already register" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "user register successfully", newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(user.password, password);
    if (isMatch) {
      return res.status(400).json({ message: "password is wrong" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ message: "user login successfully", token, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const userLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error login failed" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const users = await UserModel.find().select("-password");
    if (!users) {
      return res.status(400).json({ message: "users not found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await UserModel.findById(userId).select("-password");
    if (!user) {
      return res.status(200).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error getting user:", error.message);
    res.status(500).json({ message: "Server error while getting user" });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { id } = req.params;
    const update = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
      },
      { new: true }
    );
    res.status(200).json({ message: "user update successfully ", update });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "user updating issue" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  userLogout,
  getAllUser,
  getSingleUser,
  userUpdate,
};
