const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already register" });
    }
    const newUser = new UserModel({
      name,
      email,
      password,
    });
    await newUser.save();
    return res.status(201).json({ message: "user register successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
module.exports = { userRegister };
