const Refund = require("../models/refundModel");
const CashCount = require("../models/cashCountModel");

exports.getRefundList = async (req, res) => {
  try {
    const latest15 = await Refund.find().sort({ timestamp: -1 }).limit(15);

    await Refund.deleteMany({
      _id: { $nin: latest15.map((r) => r._id) },
    });

    res.json(latest15);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch RefundList" });
  }
};

exports.getCashCountList = async (req, res) => {
  try {
    const latest15 = await CashCount.find().sort({ timestamp: -1 }).limit(15);

    await CashCount.deleteMany({
      _id: { $nin: latest15.map((c) => c._id) },
    });

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
