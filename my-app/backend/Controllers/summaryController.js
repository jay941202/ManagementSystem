const Refund = require("../models/refundModel");
const CashCount = require("../models/cashCountModel");

exports.getRefundList = async (req, res) => {
  try {
    const allRefunds = await Refund.find().sort({ timestamp: -1 });
    const latest15 = allRefunds.slice(0, 15);
    const oldRefunds = allRefunds.slice(15);

    for (let old of oldRefunds) {
      await Refund.findByIdAndDelete(old._id);
    }

    res.json(latest15);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RefundList" });
  }
};

exports.getCashCountList = async (req, res) => {
  try {
    const allCashCounts = await CashCount.find().sort({ timestamp: -1 });
    const latest15 = allCashCounts.slice(0, 15);
    const oldCashCounts = allCashCounts.slice(15);

    for (let old of oldCashCounts) {
      await CashCount.findByIdAndDelete(old._id);
    }

    res.json(latest15);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch cashCountList" });
  }
};

exports.addCashCountList = async (req, res) => {
  try {
    const newCount = new CashCount(req.body);
    const savedCount = await newCount.save();
    res.status(201).json(savedCount);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save cash count" });
  }
};
exports.addRefund = async (req, res) => {
  try {
    const newRefund = new Refund(req.body);
    const savedRefund = await newRefund.save();
    res.status(201).json(savedRefund);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to Refund" });
  }
};
