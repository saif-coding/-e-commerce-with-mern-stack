const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: [{ type: String, required: true }],
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    productPrice: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
