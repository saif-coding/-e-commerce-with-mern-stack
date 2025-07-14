const express = require("express");
const { addProduct } = require("../controllers/productControllers");
const upload = require("../middlewares/multer");
const productRoutes = express.Router();

productRoutes.post("/add", upload.array("images", 4), addProduct);


module.exports = productRoutes;
