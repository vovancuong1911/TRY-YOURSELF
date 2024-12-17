import axios from 'axios';

const API_URL = 'http://localhost:5000/api/chatbox';

// Lấy tất cả tin nhắn
export const fetchMessages = async () => {
  try {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

// Lưu tin nhắn mới
export const saveMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/save`, message);
    return response.data;
  } catch (error) {
    console.error('Error saving message:', error);
  }
};

// Xóa tin nhắn
export const deleteMessage = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};

// Cập nhật tin nhắn
export const updateMessage = async (id, updatedMessage) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedMessage);
    return response.data;
  } catch (error) {
    console.error('Error updating message:', error);
  }
};

// Lấy tin nhắn mới nhất với giới hạn
export const fetchLatestMessages = async (limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/latest?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching latest messages:', error);
    return [];
  }
};
