const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/employeeController");
const authMiddleware = require("../middleware/userMiddleware");

router.get("/employeeList", authMiddleware, employeeController.getAllEmployees);
router.delete(
  "/deleteEmployee",
  authMiddleware,
  employeeController.deleteEmployee
);
router.put(
  "/updateEmployee",
  authMiddleware,
  employeeController.updateEmployee
);
router.post("/addEmployee", authMiddleware, employeeController.addEmployee);
router.put(
  "/unavailableDates",
  authMiddleware,
  employeeController.unavailableDates
);
module.exports = router;
