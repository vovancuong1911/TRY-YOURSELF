import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor cho request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      console.error("API Error:", data.message || error.message);

      if (status === 401) {
        console.warn("Unauthorized! Chuyển đến trang login.");
        window.location.href = '/login';
      } else if (status === 500) {
        console.warn("Lỗi server!");
      }
    } else {
      console.error("Lỗi mạng hoặc không có phản hồi từ server.");
    }
    return Promise.reject(error.response?.data || "Lỗi không xác định");
  }
);

// Hàm trợ giúp cho API
export const get = (url, params = {}) => api.get(url, { params });
export const post = (url, data) => api.post(url, data);
export const put = (url, data) => api.put(url, data);
export const remove = (url) => api.delete(url);

export default api;
