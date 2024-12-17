import React from 'react';
import DefaultLayout from '../../Layouts/DefaultLayout/DefaultLayout';
import BlogManagement from '../HomePageAdmin/Blog/BlogManagement'; // Đường dẫn chính xác đến BlogManagement

function Dashboard() {
  return (
    <DefaultLayout>
      <h2 style={{ marginBottom: '20px' }}>Welcome to Admin Dashboard</h2>
      {/* Hiển thị danh sách Blog ngay trên Dashboard */}
      <BlogManagement />
    </DefaultLayout>
  );
}

export default Dashboard;
