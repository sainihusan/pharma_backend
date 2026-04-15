const mongoose = require("mongoose");
const dns = require("dns");

// Use Google public DNS â€” fixes querySrv ETIMEOUT on restrictive networks
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`âœ… MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`âŒ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
