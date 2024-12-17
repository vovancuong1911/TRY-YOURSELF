const mongoose = require("mongoose");
const Chat = require('../model/Chat');

const ChatSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", ChatSchema);
