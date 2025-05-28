const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  console.log("user for token:", user);
  return jwt.sign({ id: user.id, username: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
exports.register = async (req, res) => {
  console.log("Register body:", req.body);
  const { name, password } = req.body;
  try {
    const userExists = await User.findOne({ name });
    if (userExists)
      return res.status(400).json({ error: "Username already exists" });

    const newUser = new User({
      name,
      password,
      role: "user",
    });
    await newUser.save();

    const token = createToken(newUser);
    res.status(201).json({ token, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};
exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    console.log("Found user:", user);
    if (!user) return res.status(401).json({ error: "No Matched Username" });

    const isMatch = await user.matchPassword(password);
    console.log("Password match result:", isMatch);
    if (!isMatch) return res.status(401).json({ error: "Incorrect Password" });

    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "login failed" });
  }
};

exports.role = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ role: user.role });
    console.log("req.user:", req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
