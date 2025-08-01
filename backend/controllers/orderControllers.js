const OrderModel = require("../models/orderModel");

const placeOrder = async (req, res) => {
  try {
    const { products, totalQuantity, totalAmount, address, paymentMethod } =
      req.body;

    const userId = req.user.userId; // This assumes JWT auth middleware sets req.user

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products provided" });
    }

    const newOrder = new OrderModel({
      userId,
      products,
      totalQuantity,
      totalAmount,
      address,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      message: "Order placed successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
};

const getMyOrders = async (req, res) => {
  const userId = req.user.userId;
  try {
    const orders = await OrderModel.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.log("Get Orders Error:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

module.exports = { placeOrder, getMyOrders };
