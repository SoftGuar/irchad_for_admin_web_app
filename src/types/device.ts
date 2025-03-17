export interface Device {
    id: string;
    type: string;
    mac: string;
    status: string;
    lastEdited: string;
    activationDate: string;
    assignedTo: string;
    version: string;
    photo: string;
}

export interface DeviceData {
    id: string;
    assignedUser: any;
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