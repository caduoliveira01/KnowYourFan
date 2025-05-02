import axios from "axios";
import authService from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("Enviando requisição:", config);

  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Resposta recebida:", response);
    return response;
  },
  (error) => {
    console.error("Erro na requisição:", error.response);
    return Promise.reject(error);
  }
);

export default api;
