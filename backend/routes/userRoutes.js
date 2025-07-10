const express = require("express");
const UserRoutes = express.Router();
const {
  userRegister,
  userLogin,
  userLogout,
  getAllUser,
  getSingleUser,
  userUpdate,
} = require("../controllers/userControllers");
const varifyToken = require("../middlewares/varifyToken");
UserRoutes.post("/register", userRegister);
UserRoutes.post("/login", userLogin);
UserRoutes.post("/logout", varifyToken, userLogout);
UserRoutes.get("/getalluser", varifyToken, getAllUser);
UserRoutes.get("/getsingleuser", varifyToken, getSingleUser);
UserRoutes.put("/update/:id", varifyToken, userUpdate);

module.exports = UserRoutes;
