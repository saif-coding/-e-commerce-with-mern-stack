const express = require("express");
const orderRoutes = express.Router();
const varifyToken = require("../middlewares/varifyToken");
const { placeOrder } = require("../controllers/orderControllers");

orderRoutes.post("/add", varifyToken, placeOrder);
// addressRoutes.get("/get", varifyToken, getAddress);
// addressRoutes.put("/update", varifyToken, updateAddress);

module.exports = orderRoutes;
