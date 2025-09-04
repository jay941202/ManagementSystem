const express = require("express");
const router = express.Router();
const summaryController = require("../Controllers/summaryController");
const authMiddleware = require("../middleware/userMiddleware");

router.get(
  "/cashCountList",
  authMiddleware,
  summaryController.getCashCountList
);
router.get("/refundList", authMiddleware, summaryController.getRefundList);
router.post("/cashCount", authMiddleware, summaryController.addCashCountList);
router.post("/addRefund", authMiddleware, summaryController.addRefund);

module.exports = router;
