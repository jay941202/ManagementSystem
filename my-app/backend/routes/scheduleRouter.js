const express = require("express");
const router = express.Router();
const scheduleController = require("../Controllers/scheduleController");
const authMiddleware = require("../middleware/userMiddleware");

router.post("/confirm", authMiddleware, scheduleController.confirmShift);
router.get("/list", authMiddleware, scheduleController.getScheduleList);
router.post("/confirmTip", authMiddleware, scheduleController.confirmTip);
router.get("/tipList", authMiddleware, scheduleController.getTipList);
module.exports = router;
