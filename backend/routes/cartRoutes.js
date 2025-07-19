const express = require("express");
const cartRoutes = express.Router();
const {
  addToCart,
  getCartByUserId,
  decreaseQuantity,
} = require("../controllers/cartControllers");
const varifyToken = require("../middlewares/varifyToken");
cartRoutes.post("/add", varifyToken, addToCart);
cartRoutes.get("/get", varifyToken, getCartByUserId);
cartRoutes.put("/down", varifyToken, decreaseQuantity);

module.exports = cartRoutes;
