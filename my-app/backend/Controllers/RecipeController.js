const Recipe = require("../models/RecipeModel");
const Inventory = require("../models/InventoryModel");

exports.getList = async (req, res) => {
  try {
    let recipes = await Recipe.find().populate(
      "ingredients.inventoryItem",
      "name unitPrice"
    );

    const updatedRecipes = recipes.map((recipe) => {
      const costOfGood = recipe.ingredients.reduce((sum, ing) => {
        const unitPrice = ing.inventoryItem?.unitPrice || 0;
        const volume = parseFloat(ing.volume || 0);
        return sum + unitPrice * volume;
      }, 0);

      const margin =
        recipe.retailPrice > 0
          ? (recipe.retailPrice - costOfGood) / recipe.retailPrice
          : 0;

      return {
        ...recipe.toObject(),
        costOfGood,
        margin,
      };
    });

    res.json(updatedRecipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
};

exports.addRecipe = async (req, res) => {
  try {
    const { name, ingredients, retailPrice } = req.body;

    if (!name || !ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const populatedIngredients = await Promise.all(
      ingredients.map(async (ing) => {
        const item = await Inventory.findById(ing.inventoryItem);
        return {
          inventoryItem: ing.inventoryItem,
          volume: ing.volume,
          unitPrice: item?.unitPrice || 0,
          unit: ing.unit,
        };
      })
    );

    const costOfGood = populatedIngredients.reduce(
      (sum, ing) => sum + ing.unitPrice * parseFloat(ing.volume || 0),
      0
    );

    const margin =
      retailPrice > 0 ? (retailPrice - costOfGood) / retailPrice : 0;

    const newRecipe = await Recipe.create({
      name,
      ingredients: populatedIngredients,
      retailPrice,
      costOfGood,
      margin,
    });

    res.json(newRecipe);
  } catch (error) {
    console.error("Failed to add recipe:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

exports.deleteRecipe = async (req, res) => {
  const { id } = req.body;
  try {
    const item = await Recipe.findById(id);
    if (!item) {
      return res.status(400).json({ error: "Recipe item does not exist" });
    }
    await item.deleteOne();
    return res
      .status(200)
      .json({ message: "Recipe item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Connection Failed" });
  }
};

exports.updateRecipe = async (req, res) => {
  const { name, ingredients, retailPrice, id } = req.body;

  if (!name || !ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const populatedIngredients = await Promise.all(
      ingredients.map(async (ing) => {
        const item = await Inventory.findById(ing.inventoryItem);
        return {
          inventoryItem: ing.inventoryItem,
          volume: ing.volume,
          unitPrice: item?.unitPrice || 0,
          unit: ing.unit,
        };
      })
    );

    const costOfGood = populatedIngredients.reduce(
      (sum, ing) => sum + ing.unitPrice * parseFloat(ing.volume || 0),
      0
    );

    const margin =
      retailPrice > 0 ? (retailPrice - costOfGood) / retailPrice : 0;

    recipe.name = name;
    recipe.retailPrice = retailPrice;
    recipe.ingredients = populatedIngredients;
    recipe.costOfGood = costOfGood;
    recipe.margin = margin;

    await recipe.save();

    const updatedRecipe = await Recipe.findById(id).populate(
      "ingredients.inventoryItem",
      "name unitPrice"
    );

    res.json(updatedRecipe);
  } catch (err) {
    console.error("Failed to update recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
};
