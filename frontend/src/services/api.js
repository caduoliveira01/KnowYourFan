import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("Enviando requisição:", config);
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

export const registerUser = (userData) => api.post("/auth", userData);
export default api;
