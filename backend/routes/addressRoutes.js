const express = require("express");
const addressRoutes = express.Router();
const varifyToken = require("../middlewares/varifyToken");
const { addAddress, getAddress } = require("../controllers/addressControllers");

addressRoutes.post("/add", varifyToken, addAddress);
addressRoutes.get("/get", varifyToken, getAddress);

module.exports = addressRoutes;
