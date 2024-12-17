import React, { useEffect, useState } from "react";
import { get } from "../../../config/Connect"; // Import hàm get từ Connect.js

import BlogCard from "./BlogCard"; // Import BlogCard
import Loading from "../../../Layouts/Loading/Loading"; // Import đúng Loading
import ErrorMessage from "../../../components/ErrorMessage"; // Import đúng ErrorMessage
import styles from "./BlogPreview.module.scss";

function BlogPreview() {
  const [blogs, setBlogs] = useState([]); // State lưu danh sách bài viết
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await get("/api/blogs"); // Gọi API lấy danh sách blog
        if (data && Array.isArray(data)) {
          setBlogs(data.slice(0, 5)); // Chỉ lấy 5 bài viết đầu tiên
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Không thể tải dữ liệu bài viết!");
      } finally {
        setLoading(false); // Kết thúc trạng thái loading
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className={styles.blogPreviewContainer}>
      <h2 className={styles.title}>Bài viết mới nhất</h2>

      {/* Trạng thái Loading */}
      {loading && <Loading />} 

      {/* Trạng thái lỗi */}
      {error && <ErrorMessage message={error} />}

      {/* Hiển thị danh sách bài viết */}
      {!loading && !error && (
        <div className={styles.blogList}>
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogPreview;
