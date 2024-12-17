const express = require('express');
const bodyParser = require('body-parser');
const chatboxRouter = require('./routes/ChatboxRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/connect');
const indexRouter = require('./routes/index');
require('dotenv').config(); // Sử dụng dotenv để quản lý biến môi trường

const app = express();
const port = process.env.PORT || 5000;

// Kết nối CSDL
connectDB()
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Thoát nếu kết nối CSDL thất bại
  });

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_CLIENT || 'http://localhost:3000', // Thêm fallback
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve thư mục tĩnh 'uploads'
app.use(express.static('uploads'));

// Routes
app.use('/api', indexRouter);
app.use('/api/chatbox', chatboxRouter);

// Route kiểm tra server hoạt động
app.get('/', (req, res) => {
  res.status(200).send('Server is running!');
});

// Lắng nghe cổng
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
