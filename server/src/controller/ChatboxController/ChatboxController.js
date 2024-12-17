const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");

// API: Lưu tin nhắn vào MongoDB
router.post("/save", async (req, res) => {
  const { userName, message } = req.body;

  try {
    const newChat = new Chat({ userName, message, createdAt: new Date() });
    await newChat.save();
    res.status(200).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});

module.exports = router;
