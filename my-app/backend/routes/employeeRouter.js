const express = require("express");
const router = express.Router();
const employeeController = require("../Controllers/employeeController");

router.get("/employeeList", employeeController.getAllEmployees);
router.delete("/deleteEmployee", employeeController.deleteEmployee);
module.exports = router;
