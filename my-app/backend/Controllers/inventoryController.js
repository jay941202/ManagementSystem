const Inventory = require("../models/InventoryModel");

exports.getList = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
};
exports.addInventory = async (req, res) => {
  try {
    const { name, vendor, volume, price, unitPrice, inStock } = req.body;
    const existingItem = await Inventory.findOne({ name, vendor });
    if (existingItem) {
      return res.status(400).json({ error: "Item already exists" });
    }
    const newInventory = await Inventory.create({
      name: name,
      vendor: vendor,
      volume: volume,
      price: price,
      unitPrice: unitPrice,
      inStock: inStock,
    });
    res.json(newInventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add inventory" });
  }
};
