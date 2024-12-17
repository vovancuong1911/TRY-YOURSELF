const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// Route dành riêng cho admin
router.get('/dashboard', authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: 'Welcome to Admin Dashboard!', user: req.user });
});

module.exports = router;
