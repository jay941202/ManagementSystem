const User = require("../models/userModel");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch employee list" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    const userExist = await User.findById(id);
    if (!userExist) {
      return res.status(400).json({ error: "User does not exists" });
    }
    await userExist.deleteOne();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Server Connection Failed" });
  }
};
