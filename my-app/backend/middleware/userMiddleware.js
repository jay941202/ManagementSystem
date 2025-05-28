const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "token required" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log("authHeader:", req.headers.authorization);
    console.log("decoded:", decoded);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token Invalid" });
  }
}

module.exports = authMiddleware;
