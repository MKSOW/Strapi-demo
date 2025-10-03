import axios from "axios";

// lecture de la variable d'env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
