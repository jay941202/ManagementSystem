const mongoose = require("mongoose");

const refundSummarySchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const RefundSummary = mongoose.model("RefundSummary", refundSummarySchema);

module.exports = RefundSummary;
