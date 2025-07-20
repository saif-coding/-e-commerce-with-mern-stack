const express = require("express");
const cartRoutes = express.Router();
const {
  addToCart,
  getCartByUserId,
  decreaseQuantity,
  increasQuantity,
  removeProductFromCart,
} = require("../controllers/cartControllers");
const varifyToken = require("../middlewares/varifyToken");
cartRoutes.post("/add", varifyToken, addToCart);
cartRoutes.get("/get", varifyToken, getCartByUserId);
cartRoutes.put("/down", varifyToken, decreaseQuantity);
cartRoutes.put("/upper", varifyToken, increasQuantity);
cartRoutes.put("/remove", varifyToken, removeProductFromCart);

module.exports = cartRoutes;
