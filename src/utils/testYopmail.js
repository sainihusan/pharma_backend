const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config({ path: "D:/pharma_backend/.env" });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const testEmail = async () => {
  try {
    console.log("Verifying transporter...");
    await transporter.verify();
    console.log("Transporter is ready");

    const mailOptions = {
      from: `"Test Agent IDE" <${process.env.SMTP_USER}>`,
      to: "antigravitytest123@yopmail.com",
      subject: "Test OTP Email to Yopmail",
      text: "This is a test email to verify if Yopmail receives mail from this SMTP.",
    };

    console.log("Sending test email to Yopmail...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

testEmail();
