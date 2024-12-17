const ModelBlog = require('../../model/ModelBlog');
const Joi = require('joi');
const mongoose = require('mongoose');

const blogSchema = Joi.object({
  img: Joi.string().uri().optional(),
  title: Joi.string().required(),
  des: Joi.string().required(),
});

class BlogController {
  async getAllBlogs(req, res) {
    const { search = '', page = 1, limit = 10 } = req.query;
    const maxLimit = Math.min(parseInt(limit) || 10, 50);

    try {
      const query = search
        ? { title: { $regex: search, $options: 'i' } }
        : {};

      const dataBlog = await ModelBlog.find(query)
        .skip((page - 1) * maxLimit)
        .limit(maxLimit)
        .exec();

      const totalBlogs = await ModelBlog.countDocuments(query);

      return res.status(200).json({
        data: dataBlog,
        totalPages: Math.ceil(totalBlogs / maxLimit),
        currentPage: parseInt(page),
      });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy danh sách bài viết', error: error.message });
    }
  }

  async createBlog(req, res) {
    const { img, title, des } = req.body;
    const { error } = blogSchema.validate({ img, title, des });

    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const newBlog = new ModelBlog({ img, title, des });
      const savedBlog = await newBlog.save();
      return res.status(201).json({ message: 'Thêm bài viết thành công', blog: savedBlog });
    } catch (error) {
      console.error('Error saving blog:', error);
      return res.status(500).json({ message: 'Lỗi khi lưu bài viết', error: error.message });
    }
  }

  async getBlogById(req, res) {
    const { id } = req.params;

    try {
      const blog = await ModelBlog.findById(id);
      if (!blog) return res.status(404).json({ message: 'Không tìm thấy bài viết' });

      return res.status(200).json(blog);
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      return res.status(500).json({ message: 'Lỗi khi lấy bài viết', error: error.message });
    }
  }

  async updateBlog(req, res) {
    const { id } = req.params;
    const { img, title, des } = req.body;

    const { error } = blogSchema.validate({ img, title, des });
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
      const updatedBlog = await ModelBlog.findByIdAndUpdate(
        id, { img, title, des }, { new: true, runValidators: true }
      );

      if (!updatedBlog) return res.status(404).json({ message: 'Không tìm thấy bài viết' });

      return res.status(200).json({ message: 'Cập nhật bài viết thành công', blog: updatedBlog });
    } catch (error) {
      console.error('Error updating blog:', error);
      return res.status(500).json({ message: 'Lỗi khi cập nhật bài viết', error: error.message });
    }
  }

  async deleteBlog(req, res) {
    const { id } = req.params;

    try {
      const result = await ModelBlog.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: 'Không tìm thấy bài viết' });

      return res.status(200).json({ message: 'Xóa bài viết thành công' });
    } catch (error) {
      console.error('Error deleting blog:', error);
      return res.status(500).json({ message: 'Lỗi khi xóa bài viết', error: error.message });
    }
  }

  async ChangeImgwebsite(req, res) {
    return res.status(501).json({ message: 'Chức năng đang được phát triển' });
  }
}

module.exports = {
  BlogController,
  blogController: new BlogController(),
};
