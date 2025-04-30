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
    Product: any;
    state: any;
    end_date: any;
    start_date: any;
    id: string;
    assignedUser: any;
    initial_state : string;
    image: string;
    location: string;
    status: string;
    battery: string;
    deviceId: string;
    type: string;
    MAC: string;
    activationDate: string;
    softwareVersion: string;
    maintenanceHistory: { time: string; event: string }[];
    systemLogs: { issue: string; description: string }[];
    user_id : string;
}