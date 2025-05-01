import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const login = async (email, senha) => {
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  const token = response.data.token;
  localStorage.setItem("token", token);
  return token;
};

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  return localStorage.getItem("token");
};

const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
};

export default {
  login,
  register,
  logout,
  getToken,
  isAuthenticated,
};
