const express = require("express");
const orderRoutes = express.Router();
const varifyToken = require("../middlewares/varifyToken");
const { placeOrder, getMyOrders } = require("../controllers/orderControllers");

orderRoutes.post("/add", varifyToken, placeOrder);
orderRoutes.get("/get", varifyToken, getMyOrders);

module.exports = orderRoutes;
