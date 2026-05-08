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
    console.log("Verifying transporter with SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_PORT:", process.env.SMTP_PORT);
    
    await transporter.verify();
    console.log("Transporter is ready to take our messages");

    const mailOptions = {
      from: `"Test Agent IDE" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER, // send to self
      subject: "Test OTP Email",
      text: "This is a test email to verify SMTP configuration.",
    };

    console.log("Sending test email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

testEmail();
