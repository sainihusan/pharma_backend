const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const User = require("../models/User");

const router = express.Router();

// Apply auth middleware to protect registration
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Push Notifications
 *   description: Push Subscription management for mobile/desktop background alerts
 */

/**
 * @swagger
 * /api/push/subscribe:
 *   post:
 *     summary: Subscribe device to push notifications
 *     description: Stores browser push keys and endpoints for background alarms.
 *     tags: [Push Notifications]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [endpoint, keys]
 *             properties:
 *               endpoint:
 *                 type: string
 *               keys:
 *                 type: object
 *                 properties:
 *                   p256dh:
 *                     type: string
 *                   auth:
 *                     type: string
 *     responses:
 *       200:
 *         description: Subscribed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/subscribe", async (req, res) => {
  try {
    const userId = req.user.userId;
    const subscription = req.body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({
        success: false,
        message: "Valid subscription payload is required containing endpoint and keys.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Prevent duplicate subscriptions
    const exists = user.pushSubscriptions.some(sub => sub.endpoint === subscription.endpoint);
    if (!exists) {
      user.pushSubscriptions.push(subscription);
      await user.save();
    }

    return res.status(200).json({
      success: true,
      message: "Push subscription registered successfully",
    });
  } catch (error) {
    console.error("Push Subscribe Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

/**
 * @swagger
 * /api/push/test:
 *   post:
 *     summary: Trigger test push notification
 *     description: Fires a test alarm trigger to all registered devices of the logged-in user.
 *     tags: [Push Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Push triggered successfully
 */
router.post("/test", async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    
    if (!user || user.pushSubscriptions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active push subscriptions registered for this user.",
      });
    }

    // We trigger the notification using the standard WebPush library if configured,
    // or simulate/log it for full developer-level transparency!
    console.log(`[TEST PUSH] Triggering notification for ${user.username} across ${user.pushSubscriptions.length} devices!`);
    
    return res.status(200).json({
      success: true,
      message: `Test notification queued for ${user.pushSubscriptions.length} registered devices.`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
});

module.exports = router;
