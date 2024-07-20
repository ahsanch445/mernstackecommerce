// controllers/yourModelController.js
const orderModel = require("../Models/Order-Models");
const myOrder = require("../Models/My-Orders");
// Get all data from the model
const getAllYourModels = async (req, res) => {
  try {
    const models = await orderModel.find().populate("deliveryAddrss");
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const handleMyOrderDeliveryStatus = async (deliveryStatus, adminOrderId) => {
  try {
    // Convert adminOrderId to a string and trim any whitespace
    adminOrderId = String(adminOrderId).trim();

    // Find the order using the adminOrderId
    let myOrderAdmin = await myOrder.findOne({ adminOrderId });

    // Log the result of the find operation

    // Check if the order was found
    if (myOrderAdmin) {
      // Update the delivery status if the order is found
      myOrderAdmin.deliveryStatus = deliveryStatus;
      await myOrderAdmin.save();
      console.log("Delivery status updated successfully.");
    } else {
      console.log("Order not found.");
    }
  } catch (error) {
    console.error("Error updating delivery status:", error);
  }
};
//updateadmindata;
const updatePaymentStatus = async (req, res) => {
  const { Id, paymentStatus } = req.body;

  try {
    // Find the order by Id
    handleMyOrderDeliveryStatus(paymentStatus, Id);
    const updatedOrder = await orderModel.findByIdAndUpdate(
      Id,
      { deliveryStatus: paymentStatus },
      { new: true }
    );
    if (!updatedOrder) {
      console.error("Order not found");
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({
      message: "Updated the order successfully",
      deliveryStatus: paymentStatus,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Failed to update the order" });
  }
};

//update myodr delivery status

const deleteItem = async (req, res) => {
  try {
    const { id } = req.body;
    const item = await orderModel.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

//my Orders show all orders

const allMyOrders = async (req, res) => {
  try {
    const orders = await myOrder
      .find({ userId: req.body.userId })
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllYourModels,
  updatePaymentStatus,
  deleteItem,
  allMyOrders,
};
