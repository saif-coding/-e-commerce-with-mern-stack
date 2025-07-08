const express = require("express");
const UserRoutes = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
  getAllUser,
} = require("../controllers/userControllers");

UserRoutes.post("/register", userRegister);
UserRoutes.post("/login", userLogin);
UserRoutes.post("/logout", userLogout);
UserRoutes.get("/getalluser", getAllUser);

module.exports = UserRoutes;
