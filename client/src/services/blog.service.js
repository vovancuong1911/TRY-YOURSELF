import api from "../config/Connect";

const BASE = "api/blogs";

export const getAllBlog = async () => {
  try {
    const response = await api.get(BASE);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const getBlogById = async (id) => {
  try {
    const response = await api.get(`${BASE}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const createBlog = async (title, des, img) => {
  try {
    const response = await api.post(BASE, { title, des, img });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const updateBlog = async (id, title, des, img) => {
  try {
    const response = await api.put(`${BASE}/${id}`, { title, des, img });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

export const deleteBlog = async (id) => {
  try {
    const response = await api.delete(`${BASE}/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}