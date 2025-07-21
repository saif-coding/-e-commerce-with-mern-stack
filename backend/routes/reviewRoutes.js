const express = require("express");
const reviewRoutes = express.Router();
const varifyToken = require("../middlewares/varifyToken");
const { addReview } = require("../controllers/reviewControllers");

reviewRoutes.post("/add/:id", varifyToken, addReview);

module.exports = reviewRoutes;
