const Order = require("../models/Order");

const createOrder = async (userId, userEmail, orderData) => {
  try {
    const order = await Order.create({
      user: userId,
      userEmail: userEmail,
      items: orderData.items,
      total: orderData.total,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod || "COD",
    });
    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrdersByUser = async (userId) => {
  try {
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    return orders;
  } catch (error) {
    throw error;
  }
};

const updateOrderStatus = async (orderId, status, acceptedByAdmin = false) => {
  try {
    const updateData = { status };
    if (acceptedByAdmin) {
      updateData.acceptedByAdmin = true;
    }
    const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    if (!order) {
      throw { status: 404, message: "Order not found" };
    }
    return order;
  } catch (error) {
    throw error;
  }
};

const deleteOrder = async (orderId) => {
  try {
    const order = await Order.findByIdAndDelete(orderId);
    if (!order) {
      throw { status: 404, message: "Order not found" };
    }
    return order;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  updateOrderStatus,
  deleteOrder,
};
