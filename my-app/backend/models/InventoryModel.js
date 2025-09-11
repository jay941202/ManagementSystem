const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      default: "No Vendor",
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
      type: String,
      default: null,
    },
    enough: {
      type: Boolean,
      default: false,
    },
    unit: {
      type: String,
      default: "",
    },
    unitPerCase: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", InventorySchema);
module.exports = Inventory;
