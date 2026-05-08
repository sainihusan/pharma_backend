const mongoose = require("mongoose");
require("dotenv").config({ path: "D:/pharma_backend/.env" });
const User = require("../models/User");

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const user = await User.findOne({ email: "antigravitytest123@yopmail.com" });
    if (user) {
      console.log("User found:");
      console.log("Email:", user.email);
      console.log("OTP:", user.otp);
      console.log("isVerified:", user.isVerified);
    } else {
      console.log("User not found");
    }
    await mongoose.connection.close();
  } catch (error) {
    console.error("Error:", error);
  }
};

checkUser();
