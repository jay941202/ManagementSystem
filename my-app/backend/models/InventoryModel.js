const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    updatesByEmp: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
