const PillReminder = require("../models/PillReminder");

const createReminder = async (userId, data) => {
  try {
    const reminder = await PillReminder.create({
      user: userId,
      medName: data.medName,
      dosage: data.dosage,
      time: data.time,
      frequency: data.frequency || "Daily",
      notes: data.notes || "",
      isActive: data.isActive !== undefined ? data.isActive : true,
    });
    return reminder;
  } catch (error) {
    throw error;
  }
};

const getRemindersByUser = async (userId) => {
  try {
    const reminders = await PillReminder.find({ user: userId }).sort({ createdAt: -1 });
    return reminders;
  } catch (error) {
    throw error;
  }
};

const updateReminder = async (reminderId, userId, updateData) => {
  try {
    // Restrict update to ensure it belongs to the authenticated user
    const reminder = await PillReminder.findOneAndUpdate(
      { _id: reminderId, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!reminder) {
      throw { status: 404, message: "Reminder not found or unauthorized access" };
    }
    return reminder;
  } catch (error) {
    throw error;
  }
};

const toggleReminderStatus = async (reminderId, userId) => {
  try {
    const existing = await PillReminder.findOne({ _id: reminderId, user: userId });
    if (!existing) {
      throw { status: 404, message: "Reminder not found or unauthorized access" };
    }
    
    existing.isActive = !existing.isActive;
    await existing.save();
    return existing;
  } catch (error) {
    throw error;
  }
};

const deleteReminder = async (reminderId, userId) => {
  try {
    const reminder = await PillReminder.findOneAndDelete({ _id: reminderId, user: userId });
    if (!reminder) {
      throw { status: 404, message: "Reminder not found or unauthorized access" };
    }
    return reminder;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReminder,
  getRemindersByUser,
  updateReminder,
  toggleReminderStatus,
  deleteReminder,
};
