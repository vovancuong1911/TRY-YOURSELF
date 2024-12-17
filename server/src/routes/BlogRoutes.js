const express = require('express');
const router = express.Router();
const { blogController } = require('../controller/BlogController/BlogController'); // Sử dụng instance
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

console.log('BlogController:', blogController); // Debug để đảm bảo không undefined

router.get('/', blogController.getAllBlogs);
router.post('/', authMiddleware, adminMiddleware, blogController.createBlog);
router.get('/:id', blogController.getBlogById);
router.put('/:id', authMiddleware, adminMiddleware, blogController.updateBlog);
router.delete('/:id', authMiddleware, adminMiddleware, blogController.deleteBlog);

module.exports = router;
