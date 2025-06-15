// src/types.ts
export interface Uptime {
  averageUptimeRaw: number;
  maxUptimeRaw: number;
  averageUptime: string;
  maxUptime: string;
}

export interface Anomaly {
  timestamp: string;
  service: string;
}

export interface DiskUsage {
  timestamp: string;
  disk_usage_percent: number;
  cpu_usage: number;
}
