import axios from "axios";
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:2000/", //i'll change it with the deployed link later
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  });
  
  export const apiService = {
    get: async (endpoint: string, params = {}) => {
      const response = await api.get(endpoint, { params });
      console.log(response.data);
      return response.data;
    },
  
    post: async (endpoint: string, data: any) => {
      const response = await api.post(endpoint, data);
      return response.data;
    },
  
    put: async (endpoint: string, data: any) => {
      const response = await api.put(endpoint, data);
      return response.data;
    },
  
    delete: async (endpoint: string) => {
      const response = await api.delete(endpoint);
      return response.data;
    },
  
    patch: async (endpoint: string, data: any) => {
      const response = await api.patch(endpoint, data);
      return response.data;
    },
  };
  
  