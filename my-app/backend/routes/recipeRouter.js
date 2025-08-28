const express = require("express");
const router = express.Router();
const recipeController = require("../Controllers/RecipeController");
const authMiddleware = require("../middleware/userMiddleware");

router.get("/getList", authMiddleware, recipeController.getList);
router.post("/addRecipe", authMiddleware, recipeController.addRecipe);
router.delete("/deleteRecipe", authMiddleware, recipeController.deleteRecipe);
router.put("/updateRecipe", authMiddleware, recipeController.updateRecipe);
module.exports = router;
