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
    const { name, vendor, volume, price, inStock, updatesByEmp } = req.body;
    const existingItem = await Inventory.findOne({ name, vendor });
    if (existingItem) {
      return res.status(400).json({ error: "Item already exists" });
    }
    const parsedVolume = parseFloat(volume);
    const parsedPrice = parseFloat(price);
    const unitPrice = parsedVolume > 0 ? parsedPrice / parsedVolume : 0;
    const newInventory = await Inventory.create({
      name,
      vendor,
      volume: parsedVolume,
      price: parsedPrice,
      unitPrice,
      inStock,
      updatesByEmp,
    });
    res.json(newInventory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add inventory" });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const {
      id,
      name,
      vendor,
      volume,
      price,
      unitPrice,
      inStock,
      updatesByEmp,
    } = req.body;
    if (!id)
      return res.status(400).json({ message: "Inventory ID is required" });
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      { name, vendor, volume, price, unitPrice, inStock, updatesByEmp },
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
