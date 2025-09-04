const express = require("express");
const router = express.Router();
const tvController = require("../Controllers/tvController");
const authMiddleware = require("../middleware/userMiddleware");

router.get("/getList", authMiddleware, tvController.getList);
router.post("/addList", authMiddleware, tvController.addList);
router.delete("/deleteTicket", authMiddleware, tvController.deleteTicket);

module.exports = router;
