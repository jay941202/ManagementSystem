const express = require("express");
const router = express.Router();
const inventoryController = require("../Controllers/inventoryController");
const authMiddleware = require("../middleware/userMiddleware");

router.get("/inventoryList", authMiddleware, inventoryController.getList);
router.post("/addInventory", authMiddleware, inventoryController.addInventory);
router.put(
  "/updateInventory",
  authMiddleware,
  inventoryController.updateInventory
);
router.delete(
  "/deleteInventory",
  authMiddleware,
  inventoryController.deleteInventory
);
module.exports = router;
