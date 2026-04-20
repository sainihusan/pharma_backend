const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        description: { type: String },
      },
    ],
    shippingAddress: {
      name: String,
      address: String,
      mobile: String,
      pincode: String,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Delivered", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      default: "COD",
    },
    acceptedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
