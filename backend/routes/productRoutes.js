const express = require("express");
const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProdcut,
  deleteProduct,
} = require("../controllers/productControllers");
const varifyToken = require("../middlewares/varifyToken");
const upload = require("../middlewares/multer");
const productRoutes = express.Router();

productRoutes.post("/add", upload.array("images", 4), varifyToken, addProduct);
productRoutes.get("/getall", varifyToken, getAllProducts);
productRoutes.get("/getsingle/:productId", varifyToken, getSingleProduct);
productRoutes.post(
  "/update/:id",
  upload.array("images", 4),
  varifyToken,
  updateProdcut
);
productRoutes.delete("/delete/:id", varifyToken, deleteProduct);

module.exports = productRoutes;
