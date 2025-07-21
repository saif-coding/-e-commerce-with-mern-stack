const ReviewModel = require("../models/reviewModels");

const addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.id; //from url
  const userId = req.user.userId; // from middleware

  try {
    const review = new ReviewModel({
      productId,
      userId,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({ message: "Review added", review });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addReview };
