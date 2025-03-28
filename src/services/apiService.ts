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
  
  interface ApiResponse<T> {
    success: boolean;
    data: T;
  }
  
  interface Device {
    id: number;
    name: string;
    type: string;
    status: string;
  }
  
  export const deviceApi = {
    getAll: async (): Promise<ApiResponse<Device[]>> => {
      return await apiService.get("/admin/dispositive/");
    },
    
    getById: async (id: number | string): Promise<ApiResponse<Device>> => {
      return await apiService.get(`/admin/dispositive/${id}`);
    },
  
    create: async (data: { name: string; type: string; status: string }) => {
      return await apiService.post("/admin/dispositive/", data);
    },
  
    update: async (id: number | string, data: Partial<Device>) => {
      return await apiService.put(`/admin/dispositive/${id}`, data);
    },
  
    delete: async (id: number | string) => {
      return await apiService.delete(`/admin/dispositive/${id}`);
    },
  
    block: async (id: number | string, blocked: boolean) => {
      return await apiService.patch(`/admin/dispositive/${id}/block`, { blocked });
    },
   
  };
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  export async function fetchTotalSales() {
    const response = await fetch(`${API_URL}/analytics/device/sold`);
    if (!response.ok) throw new Error("Failed to fetch total sales");
    return response.json();
  }
  
  export async function fetchRevenueData() {
    const response = await fetch(`${API_URL}/analytics/device/revenue`);
    if (!response.ok) throw new Error("Failed to fetch revenue data");
    return response.json();
  }
  
  export async function fetchTotalDevices() {
    const response = await fetch(`${API_URL}/analytics/device/total`);
    if (!response.ok) throw new Error("Failed to fetch total devices");
    return response.json();
  }
  
  export async function fetchTotalUsers() {
    const response = await fetch(`${API_URL}/analytics/users/total`);
    if (!response.ok) throw new Error("Failed to fetch total users");
    return response.json();
  }
  
  export async function fetchWarnings() {
    const response = await fetch(`${API_URL}/analytics/device/issues`);
    if (!response.ok) throw new Error("Failed to fetch warnings");
    return response.json();
  }

  