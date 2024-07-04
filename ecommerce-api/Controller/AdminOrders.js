// controllers/itemController.js
const Item = require("../Models/OrderItem-Model");

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate("orderAddress");
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const updatePaymentStatus = async (req, res) => {
  const { Id, paymentStatus, deliveryId } = req.body;

  try {
    console.log("Received request with body:", req.body);

    // Find the order by Id
    const updatedOrder = await Item.findById(Id);
    if (!updatedOrder) {
      console.error("Order not found");
      return res.status(404).json({ error: "Order not found" });
    }

    // Find the item within the order by deliveryId
    let item = updatedOrder.items.find((elem) => elem._id == deliveryId);
    if (!item) {
      console.error("Item not found");
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the delivery status
    item.deliveryStatus = paymentStatus;

    // Save the updated order
    const newData = await updatedOrder.save();
    console.log("Updated order saved successfully");

    // Send the updated order in the response
    res
      .status(200)
      .json({ message: "Updated the order successfully", data: newData });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update the order" });
  }
};

const deleteItem = async (req, res) => {
  console.log(req.body);
  try {
    const { id } = req.body;
    const item = await Item.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getAllItems, updatePaymentStatus, deleteItem };
