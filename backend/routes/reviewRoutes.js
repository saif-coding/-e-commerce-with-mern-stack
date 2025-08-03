const express = require("express");
const reviewRoutes = express.Router();
const varifyToken = require("../middlewares/varifyToken");
const {
  addReview,
  getReviewsByProduct,
} = require("../controllers/reviewControllers");

reviewRoutes.post("/add/:id", addReview);
reviewRoutes.get("/get/:productId", getReviewsByProduct);

module.exports = reviewRoutes;
