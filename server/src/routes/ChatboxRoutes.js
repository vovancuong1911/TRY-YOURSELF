const express = require('express');
const router = express.Router();
const Chat = require('../model/Chat'); // Model MongoDB

// API lưu tin nhắn
router.post('/save', async (req, res) => {
  const { userName, message } = req.body;

  try {
    const newMessage = new Chat({ userName, message, createdAt: new Date() });
    await newMessage.save();
    res.status(200).json({ message: 'Message saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// API lấy tất cả tin nhắn
router.get('/messages', async (req, res) => {
  try {
    const messages = await Chat.find({});
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// API xóa tin nhắn theo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// API cập nhật tin nhắn theo ID
router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const updatedMessage = await Chat.findByIdAndUpdate(
      id,
      { message, createdAt: new Date() },
      { new: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }

    res.status(200).json({ message: 'Message updated successfully!', updatedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// API lọc tin nhắn theo tên người dùng
router.get('/messages/:userName', async (req, res) => {
  const { userName } = req.params;

  try {
    const messages = await Chat.find({ userName });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// API xóa tất cả tin nhắn
router.delete('/delete-all', async (req, res) => {
  try {
    await Chat.deleteMany({});
    res.status(200).json({ message: 'All messages deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete all messages' });
  }
});

module.exports = router;
