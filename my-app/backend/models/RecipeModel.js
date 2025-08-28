const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  inventoryItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventory",
    required: true,
  },
  volume: { type: String, required: true },
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: {
    type: [ingredientSchema],
    default: [],
  },
  retailPrice: { type: Number },
  costOfGood: { type: Number },
  margin: { type: Number },
});

module.exports = mongoose.model("Recipe", recipeSchema);
