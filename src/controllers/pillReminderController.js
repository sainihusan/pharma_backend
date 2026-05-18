const pillReminderService = require("../services/pillReminderService");

const createReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminderData = req.body;
    
    if (!reminderData.medName || !reminderData.dosage || !reminderData.time) {
      return res.status(400).json({
        success: false,
        message: "Medicine name, dosage, and time are required.",
        data: null,
      });
    }

    const reminder = await pillReminderService.createReminder(userId, reminderData);
    
    return res.status(201).json({
      success: true,
      message: "Pill reminder created successfully",
      data: reminder,
    });
  } catch (error) {
    console.error("Create Pill Reminder Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const getReminders = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reminders = await pillReminderService.getRemindersByUser(userId);

    return res.status(200).json({
      success: true,
      message: "Pill reminders retrieved successfully",
      data: reminders,
    });
  } catch (error) {
    console.error("Get Pill Reminders Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const updateReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const updateData = req.body;

    const reminder = await pillReminderService.updateReminder(id, userId, updateData);

    return res.status(200).json({
      success: true,
      message: "Pill reminder updated successfully",
      data: reminder,
    });
  } catch (error) {
    console.error("Update Pill Reminder Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const toggleReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    const reminder = await pillReminderService.toggleReminderStatus(id, userId);

    return res.status(200).json({
      success: true,
      message: `Pill reminder active status is now: ${reminder.isActive}`,
      data: reminder,
    });
  } catch (error) {
    console.error("Toggle Pill Reminder Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

const deleteReminder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;

    await pillReminderService.deleteReminder(id, userId);

    return res.status(200).json({
      success: true,
      message: "Pill reminder deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Delete Pill Reminder Error:", error);
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Internal server error",
      data: null,
    });
  }
};

module.exports = {
  createReminder,
  getReminders,
  updateReminder,
  toggleReminder,
  deleteReminder,
};
