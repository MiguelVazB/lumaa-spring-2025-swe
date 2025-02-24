const express = require("express");
const { createUser, getUser } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // hash password
    const saltRounds = 10;
    let tempPassword = password.toString();
    const hashedPassword = await bcrypt.hash(tempPassword, saltRounds);
    const newUser = await createUser(username, hashedPassword);

    if (!newUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    console.error(err);
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    const user = await getUser(username);
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    // compare password
    let tempPassword = password.toString();
    const passwordMatch = await bcrypt.compare(tempPassword, user.password);
    if (passwordMatch) {
      // create token
      const token = jwt.sign(
        { username, id: user.id },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
