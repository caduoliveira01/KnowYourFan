import axios from "axios";

const API_URL = "http://localhost:8080/auth";

const login = async (email, senha) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    senha,
  });

  const token = response.data.token;
  localStorage.setItem("token", token);
  return token;
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
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (e) {
    return false;
  }
};

export default {
  login,
  logout,
  getToken,
  isAuthenticated,
};
