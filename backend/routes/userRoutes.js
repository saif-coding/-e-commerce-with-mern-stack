const express = require("express");
const { userRegister } = require("../controllers/userControllers");
const UserRoutes = express.Router();

UserRoutes.post("/register", userRegister);

module.exports = UserRoutes;
