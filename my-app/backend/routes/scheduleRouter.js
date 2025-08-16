const express = require("express");
const router = express.Router();
const scheduleController = require("../Controllers/scheduleController");
const authMiddleware = require("../middleware/userMiddleware");

router.post("/confirm", authMiddleware, scheduleController.confirmShift);

module.exports = router;
