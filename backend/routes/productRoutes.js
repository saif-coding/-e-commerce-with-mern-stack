const express = require("express");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
} = require("../controllers/productControllers");
const varifyToken = require("../middlewares/varifyToken");
const upload = require("../middlewares/multer");
const productRoutes = express.Router();

productRoutes.post("/add", upload.array("images", 4), varifyToken, addProduct);
productRoutes.get("/getall", varifyToken, getAllProducts);
productRoutes.get("/getsingle/:productId", varifyToken, getSingleProduct);

module.exports = productRoutes;
