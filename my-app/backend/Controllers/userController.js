const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/userModel");

const createToken = (user) => {
  return jwt.sign({ id: user.id, username: user.name }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(401).json({ error: "No Matched Username" });
    const isMatch = user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect Password" });
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "login failed" });
  }
};
