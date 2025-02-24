const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"].split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Access denied" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(500).json({ error: "Failed to authenticate token" });
    }
    req.id = decoded.id;
    next();
  });
};

module.exports = verifyToken;
