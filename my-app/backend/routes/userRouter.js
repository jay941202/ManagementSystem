const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const authMiddleware = require("../middleware/userMiddleware");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/role", authMiddleware, userController.role);
module.exports = router;
