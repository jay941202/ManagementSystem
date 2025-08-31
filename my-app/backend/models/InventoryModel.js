const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      default: null,
    },
    volume: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: 0,
    },
    unitPrice: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: null,
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
