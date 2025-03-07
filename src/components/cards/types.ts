export interface DeviceData {
    image: string;
    location: string;
    status: string;
    battery: string;
    deviceId: string;
    type: string;
    mac: string;
    activationDate: string;
    softwareVersion: string;
    maintenanceHistory: { time: string; event: string }[];
    systemLogs: { issue: string; description: string }[];
  }
  