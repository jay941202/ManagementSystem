const express = require("express");
const router = express.Router();
const summaryController = require("../Controllers/summaryController");

router.get("/cashCountList", summaryController.getCashCountList);
router.get("/refundList", summaryController.getRefundList);

module.exports = router;
