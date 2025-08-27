const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  vendor: {
    type: String,
  },
  volume: {
    type: Number,
  },
  price: {
    type: Number,
  },
  unitPrice: {
    type: Number,
  },
  inStock: {
    type: Number,
  },
});

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
