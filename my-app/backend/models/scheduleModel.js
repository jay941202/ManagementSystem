const mongoose = require("mongoose");

const employeeShiftSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  clockIn: {
    type: Date,
    default: null,
  },
  clockOut: {
    type: Date,
    default: null,
  },
});

const shiftSchema = new mongoose.Schema({
  employees: [employeeShiftSchema],
  tipTotal: {
    type: Number,
    default: null,
  },
  scheduleConfirmed: {
    type: Boolean,
    default: false,
  },
  tipConfirmed: {
    type: Boolean,
    default: false,
  },
});

const scheduleSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      unique: true,
    },
    AM: shiftSchema,
    PM: shiftSchema,
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
module.exports = Schedule;
