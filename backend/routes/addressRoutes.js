const express = require("express");
const addressRoutes = express.Router();
const varifyToken = require("../middlewares/varifyToken");
const {
  addAddress,
  getAddress,
  updateAddress,
} = require("../controllers/addressControllers");

addressRoutes.post("/add", varifyToken, addAddress);
addressRoutes.get("/get", varifyToken, getAddress);
addressRoutes.put("/update", varifyToken, updateAddress);

module.exports = addressRoutes;
