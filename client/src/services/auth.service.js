import api from "../config/Connect";

export const login = async (email, password) => {
  try {
    const response = await api.post("api/auth/login", { email, password });
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const register = async (fullname, email, password, phone) => {
  try {
    const response = await api.post("api/auth/register", { fullname, email, password, phone });
    return response;
  } catch (error) {
    return error.response.data;
  }
}