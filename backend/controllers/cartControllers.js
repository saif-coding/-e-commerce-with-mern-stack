const CartModel = require("../models/carModels.js");
const ProductModel = require("../models/productModels.js");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;
    // ✅ Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Check if cart exists for user
    let cart = await CartModel.findOne({ userId });

    if (!cart) {
      // ➕ Create new cart with product
      const newCart = new CartModel({
        userId,
        items: [{ productId, quantity }],
      });

      await newCart.save();
      return res
        .status(201)
        .json({ message: "Product added to new cart", cart: newCart });
    } else {
      // ✅ Cart already exists
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // 🔁 Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // ➕ Add new product
        cart.items.push({ productId, quantity });
      }

      await cart.save();
      return res
        .status(200)
        .json({ message: "Product Quantity increase", cart });
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    return res
      .status(500)
      .json({ message: "Server error while adding to cart" });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    ); // Product details ke liye populate

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addToCart, getCartByUserId };
