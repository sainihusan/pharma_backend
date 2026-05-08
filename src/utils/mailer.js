const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  debug: true, // Enable debug output
  logger: true, // Log information to console
});

// Verify connection configuration on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to take our messages");
  }
});

/**
 * Sends an OTP email to the specified address.
 * @param {string} to - Recipient email address.
 * @param {string} otp - The 6-digit OTP code.
 * @param {string} subject - Email subject line.
 * @returns {Promise<void>}
 */
const sendOtpEmail = async (to, otp, subject = "Your OTP Code") => {
  console.log(`Attempting to send OTP email to: ${to} with subject: ${subject}`);
  
  const mailOptions = {
    from: `"PharmaCare" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8f9fa; border-radius: 12px; border: 1px solid #e1e1e1;">
        <h2 style="color: #2563eb; margin-bottom: 8px;">PharmaCare</h2>
        <p style="color: #4b5563; font-size: 15px;">Use the code below to verify your account. This code expires in <strong>10 minutes</strong>.</p>
        <div style="text-align: center; margin: 24px 0;">
          <span style="display: inline-block; font-size: 32px; letter-spacing: 8px; font-weight: 700; color: #1e40af; background: #dbeafe; padding: 12px 28px; border-radius: 8px; border: 1px solid #bfdbfe;">${otp}</span>
        </div>
        <p style="color: #6b7280; font-size: 13px;">If you did not request this code, please ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 24px 0;">
        <p style="color: #9ca3af; font-size: 11px; text-align: center;">&copy; 2026 PharmaCare. All rights reserved.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${to}. MessageId: ${info.messageId}`);
    
    // Ethereal preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info);
    if (previewUrl) {
      console.log(`Preview email: ${previewUrl}`);
    }
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error; // Re-throw so the caller can handle it if needed
  }
};

module.exports = { sendOtpEmail };
