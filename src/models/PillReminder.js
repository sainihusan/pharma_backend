const mongoose = require("mongoose");

const pillReminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    medName: {
      type: String,
      required: [true, "Medicine name is required"],
      trim: true,
    },
    dosage: {
      type: String,
      required: [true, "Dosage is required"],
      trim: true,
    },
    time: {
      type: String,
      required: [true, "Intake time is required"],
      trim: true, // Format: "HH:MM" (e.g. "08:30")
    },
    frequency: {
      type: String,
      required: [true, "Frequency is required"],
      enum: {
        values: ["Daily", "Alternate", "Weekly"],
        message: "{VALUE} is not a valid frequency",
      },
      default: "Daily",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PillReminder", pillReminderSchema);
