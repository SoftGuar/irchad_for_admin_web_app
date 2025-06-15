// src/services/systemApi.ts
import { ApiResponse } from "./ApiResponse";
import { apiService } from "./apiService";
import { Uptime, Anomaly, DiskUsage } from "../types/system";

// src/services/systemService.ts
export const systemApi = {
  getUptimeStats: async (): Promise<Uptime> => {
    const response = await apiService.get("/analytics/system/uptime-stats");
    return response; // La réponse directe contient déjà les données
  },

  getAnomalies: async (): Promise<Anomaly[]> => {
    const response = await apiService.get("/analytics/system/anomalies");
    return response;
  },

  getDiskUsage: async (): Promise<DiskUsage[]> => {
    const response = await apiService.get("/analytics/system/disk-usage");
    return response;
  }
};
