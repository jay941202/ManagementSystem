const mongoose = require("mongoose");

const cashCountSchema = new mongoose.Schema(
  {
    totalAmount: {
      type: Number,
      required: true,
    },

    bills: {
      100: { type: Number, default: 0 },
      50: { type: Number, default: 0 },
      20: { type: Number, default: 0 },
      10: { type: Number, default: 0 },
      5: { type: Number, default: 0 },
      1: { type: Number, default: 0 },
    },
    coins: {
      1: { type: Number, default: 0 },
      0.5: { type: Number, default: 0 },
      0.25: { type: Number, default: 0 },
      0.1: { type: Number, default: 0 },
      0.05: { type: Number, default: 0 },
      0.01: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const CashCount = mongoose.model("CashCount", cashCountSchema);

module.exports = CashCount;
