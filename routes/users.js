const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { User } = require("../schemas/user.schema");
const dotenv = require("dotenv");
dotenv.config();

// Register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword , mobile});
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Retrieve all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password -_id");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get user by email
router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }).select("-password -_id");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong email or password" });
    }
    const payload = { id: user._id };
    const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
