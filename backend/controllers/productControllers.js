const ProductModel = require("../models/productModels");
const uploadCloudinary = require("../middlewares/cloudinary");
const path = require("path");
const addProduct = async (req, res) => {
  try {
    const { title, description, category, productPrice, offerPrice } = req.body;
    const images = await Promise.all(
      req.files.map(async (file) => {
        const result = await uploadCloudinary(file.path); // returns { secure_url, public_id }
        // (uploadCloudinary already deletes the local file)
        return result; // { secure_url, public_id }
      })
    );
    const product = new ProductModel({
      title,
      description,
      category,
      productPrice,
      offerPrice,
      images: images,
    });
    await product.save();
    res.status(201).json({ message: "Product add successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "failed to add product" });
  }
};

module.exports = { addProduct };
