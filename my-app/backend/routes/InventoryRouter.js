const express = require("express");
const router = express.Router();
const inventoryController = require("../Controllers/inventoryController");
const authMiddleware = require("../middleware/userMiddleware");

router.get("/inventoryList", authMiddleware, inventoryController.getList);
router.post("/addInventory", authMiddleware, inventoryController.addInventory);
module.exports = router;
