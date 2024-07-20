// controllers/itemController.js
// const Item = require("../Models/OrderItem-Model");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("orderAddress");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getAllItems };
