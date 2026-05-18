const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const pillReminderController = require("../controllers/pillReminderController");

const router = express.Router();

// All pill reminder endpoints require active user authentication
router.use(verifyToken);

/**
 * @swagger
 * tags:
 *   name: Pill Reminders
 *   description: Medication schedules and push notification timing configurations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PillReminder:
 *       type: object
 *       required:
 *         - user
 *         - medName
 *         - dosage
 *         - time
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique database identifier
 *           example: 664b4c4f346b0a1d8c11e74f
 *         user:
 *           type: string
 *           description: Referenced User ID
 *           example: 664b494f346b0a1d8c11e73a
 *         medName:
 *           type: string
 *           description: Official name of the medication
 *           example: Metformin Hydrochloride (500mg)
 *         dosage:
 *           type: string
 *           description: The dose size/quantity
 *           example: 1 Tablet
 *         time:
 *           type: string
 *           description: Scheduled daily triggering time (24-hour HH:MM format)
 *           example: "08:30"
 *         frequency:
 *           type: string
 *           enum: [Daily, Alternate, Weekly]
 *           description: Recurring frequency rate
 *           example: Daily
 *         notes:
 *           type: string
 *           description: Medical or dining directions
 *           example: Take with breakfast or directly after
 *         isActive:
 *           type: boolean
 *           description: Whether push notifications are running
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2026-05-18T10:11:42Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2026-05-18T10:13:26Z
 */

/**
 * @swagger
 * /api/pill-reminders:
 *   post:
 *     summary: Create a new dosage reminder
 *     description: Creates a scheduled medication alarm connected to the authenticated user's profile.
 *     tags: [Pill Reminders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [medName, dosage, time]
 *             properties:
 *               medName:
 *                 type: string
 *                 example: Metformin Hydrochloride (500mg)
 *               dosage:
 *                 type: string
 *                 example: 1 Tablet
 *               time:
 *                 type: string
 *                 example: "08:30"
 *               frequency:
 *                 type: string
 *                 enum: [Daily, Alternate, Weekly]
 *                 example: Daily
 *               notes:
 *                 type: string
 *                 example: Take with breakfast
 *     responses:
 *       201:
 *         description: Pill reminder created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pill reminder created successfully
 *                 data:
 *                   $ref: '#/components/schemas/PillReminder'
 *       400:
 *         description: Missing required attributes
 *       401:
 *         description: Unauthorized (Token invalid or missing)
 */
router.post("/", pillReminderController.createReminder);

/**
 * @swagger
 * /api/pill-reminders:
 *   get:
 *     summary: Get all active reminders
 *     description: Retrieves the list of active pill reminders registered for the authenticated customer.
 *     tags: [Pill Reminders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Pill reminders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pill reminders retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PillReminder'
 *       401:
 *         description: Unauthorized
 */
router.get("/", pillReminderController.getReminders);

/**
 * @swagger
 * /api/pill-reminders/{id}:
 *   patch:
 *     summary: Update specific fields of a reminder
 *     description: Modifies details of a specific reminder by ID. Users can only update their own reminders.
 *     tags: [Pill Reminders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Database ID of the pill reminder to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               medName:
 *                 type: string
 *                 example: Metformin Hydrochloride (1000mg)
 *               dosage:
 *                 type: string
 *                 example: 2 Tablets
 *               time:
 *                 type: string
 *                 example: "08:30"
 *               frequency:
 *                 type: string
 *                 enum: [Daily, Alternate, Weekly]
 *               notes:
 *                 type: string
 *                 example: Take with a full glass of water
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Pill reminder updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pill reminder updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/PillReminder'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reminder not found or unauthorized
 */
router.patch("/:id", pillReminderController.updateReminder);

/**
 * @swagger
 * /api/pill-reminders/{id}/toggle:
 *   patch:
 *     summary: Toggle active notification status
 *     description: Enables/disables push alarms for a specific reminder.
 *     tags: [Pill Reminders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Database ID of the reminder to toggle
 *     responses:
 *       200:
 *         description: Toggled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Pill reminder active status is now: false"
 *                 data:
 *                   $ref: '#/components/schemas/PillReminder'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reminder not found
 */
router.patch("/:id/toggle", pillReminderController.toggleReminder);

/**
 * @swagger
 * /api/pill-reminders/{id}:
 *   delete:
 *     summary: Delete a scheduled reminder
 *     description: Permanently clears a reminder record from the MongoDB database.
 *     tags: [Pill Reminders]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Database ID of the reminder to delete
 *     responses:
 *       200:
 *         description: Pill reminder deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Pill reminder deleted successfully
 *                 data:
 *                   type: "object"
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Reminder not found or unauthorized
 */
router.delete("/:id", pillReminderController.deleteReminder);

module.exports = router;
