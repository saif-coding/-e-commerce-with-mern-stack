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

    const offerPrice = product.offerPrice; // Assuming this field exists in product

    if (!cart) {
      // ➕ Create new cart with product
      const newCart = new CartModel({
        userId,
        items: [{ productId, quantity, price: offerPrice * quantity }], // ✅ price set here
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

        // ✅ Update price based on new quantity
        cart.items[itemIndex].price =
          offerPrice * cart.items[itemIndex].quantity;
      } else {
        // ➕ Add new product with price
        cart.items.push({ productId, quantity, price: offerPrice * quantity }); // ✅ set price
      }

      await cart.save();
      return res.status(200).json({ message: "Product added into cart", cart });
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
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    ); // if needed

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId._id.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 1) {
      // ↓ Decrease quantity
      cart.items[itemIndex].quantity -= 1;
      // ↓ Decrease price
      const offerPrice = cart.items[itemIndex].productId.offerPrice;
      cart.items[itemIndex].price = offerPrice * cart.items[itemIndex].quantity;
    } else {
      // ↓ Remove if quantity is 1
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();

    res.status(200).json({ message: "Quantity updated", cart });
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const increasQuantity = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    ); // if needed

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId._id.toString() === productId.toString()
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (cart.items[itemIndex].quantity > 0) {
      // ↓ increase quantity
      cart.items[itemIndex].quantity += 1;
      // ↓ increase price
      const offerPrice = cart.items[itemIndex].productId.offerPrice;
      cart.items[itemIndex].price = offerPrice * cart.items[itemIndex].quantity;
    }
    await cart.save();

    res.status(200).json({ message: "Quantity increase", cart });
  } catch (error) {
    console.error("Error increasing quantity:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const removeProductFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const cart = await CartModel.findOne({ userId }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // ✅ Find the index of the product in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    // ❌ If product not found
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // ✅ Remove the item
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
  decreaseQuantity,
  increasQuantity,
  removeProductFromCart,
};
