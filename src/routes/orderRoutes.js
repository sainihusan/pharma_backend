const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const orderController = require("../controllers/orderController");

const router = express.Router();

// All order routes require authentication
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management endpoints
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with items and shipping details.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, total, shippingAddress]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *               total:
 *                 type: number
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   address:
 *                     type: string
 *                   mobile:
 *                     type: string
 *                   pincode:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *                 example: COD
 *     responses:
 *       201:
 *         description: Order placed successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", orderController.createOrder); // POST /api/orders

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get orders
 *     description: Retrieves orders. Admins see all, users see their own.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", orderController.getOrders);   // GET /api/orders

/**
 * @swagger
 * /api/orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     description: Update status of an order (Admin action).
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Accepted", "Delivered", "Cancelled"]
 *               acceptedByAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Order status updated
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/status", orderController.updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Delete order
 *     description: Permanently remove an order.
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
