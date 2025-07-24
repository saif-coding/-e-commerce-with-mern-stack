const AddressModel = require("../models/addressModels");

const addAddress = async (req, res) => {
  try {
    const { fullName, email, phone, street, city, state, zip, country } =
      req.body;
    const userId = req.user.userId;

    // const address = await AddressModel.findOne({ userId });
    // if (address) {
    //   return res.status(400).json({ message: "address not found" });
    // }
    const newAddress = new AddressModel({
      userId,
      fullName,
      email,
      phone,
      street,
      city,
      state,
      zip,
      country,
    });
    await newAddress.save();
    return res
      .status(201)
      .json({ message: "address added successfully", newAddress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "address adding error" });
  }
};

const getAddress = async (req, res) => {
  const userId = req.user.userId;
  try {
    const address = await AddressModel.findOne({ userId });

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    res.status(200).json({ success: true, address });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = { addAddress, getAddress };
