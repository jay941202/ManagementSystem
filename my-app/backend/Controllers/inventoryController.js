const Inventory = require("../models/InventoryModel");
const User = require("../models/userModel");

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
exports.updateInventory = async (req, res) => {
  try {
    const { id, name, vendor, volume, price, unitPrice, inStock } = req.body;
    if (!id)
      return res.status(400).json({ message: "Inventory ID is required" });
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { name, vendor, volume, price, unitPrice, inStock },
      { new: true }
    );
    if (!updatedInventory) {
      return res.status(404).json({ error: "Inventory item not found" });
    }

    res.json(updatedInventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update inventory" });
  }
};

exports.deleteInventory = async (req, res) => {
  const { id } = req.body;
  try {
    const item = await Inventory.findById(id);
    if (!item) {
      return res.status(400).json({ error: "Inventory item does not exist" });
    }
    await item.deleteOne();
    return res
      .status(200)
      .json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Connection Failed" });
  }
};
