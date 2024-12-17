const jwt = require('jsonwebtoken');
const ModelUser = require('../model/ModelUser');

// Middleware xác thực token
const authMiddleware = async (req, res, next) => {
  try {
    // Kiểm tra token từ cookies, Bearer Token hoặc query string
    const token =
      req.cookies?.Token ||
      req.headers.authorization?.split(' ')[1] ||
      req.query.token;

    if (!token) {
      return res.status(401).json({ message: 'Access Denied. No Token Provided.' });
    }

    // Kiểm tra secret key
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is missing in environment variables.');
      return res.status(500).json({ message: 'Internal Server Error.' });
    }

    // Xác minh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Kiểm tra tồn tại của người dùng trong database
    const user = await ModelUser.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: 'Access Denied. User not found.' });
    }

    // Lưu thông tin người dùng vào req.user
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid Token.' });
    }
    console.error('Auth Middleware Error:', error.message);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
};

// Middleware xác thực quyền admin
const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access Denied. Admin privileges required.' });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
};
