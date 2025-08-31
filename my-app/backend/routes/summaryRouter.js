const express = require("express");
const router = express.Router();
const summaryController = require("../Controllers/summaryController");

router.get("/cashCountList", summaryController.getCashCountList);
router.get("/refundList", summaryController.getRefundList);
router.post("/cashCount", summaryController.addCashCountList);
router.post("/addRefund", summaryController.addRefund);

module.exports = router;
