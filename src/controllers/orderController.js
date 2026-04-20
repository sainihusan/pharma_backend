const orderService = require("../services/orderService");
const User = require("../models/User");

const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    let userEmail = req.user.email;
    
    // Robust check: if email is missing in token, fetch from DB
    if (!userEmail) {
      const userProfile = await User.findById(userId);
      userEmail = userProfile?.email;
    }

    if (!userEmail) {
      return res.status(400).json({ success: false, message: "User email required. Please re-login." });
    }

    const orderData = req.body;
    const data = await orderService.createOrder(userId, userEmail, orderData);

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data,
    });
  } catch (error) {
    console.error("Order Creation Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const { role, userId } = req.user;
    let data;

    if (role === "admin") {
      data = await orderService.getAllOrders();
    } else {
      data = await orderService.getOrdersByUser(userId);
    }

    return res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, acceptedByAdmin } = req.body;
    
    const data = await orderService.updateOrderStatus(id, status, acceptedByAdmin);

    return res.status(200).json({
      success: true,
      message: `Order status updated to ${status}`,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await orderService.deleteOrder(id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};
