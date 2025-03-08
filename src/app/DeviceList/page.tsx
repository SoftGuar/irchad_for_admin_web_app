
///hadii mock berk bah npassi data 
import Home from "@/app/DeviceDetail/page";
import { DeviceData } from "@/components/cards/types";

const Page = () => {
  const deviceData: DeviceData = {
    image: "images/glasses.jpg",
    location: "ESI, Oued-Smar",
    status: "Active",
    battery: "60%",
    deviceId: "FTDSYGYGygf34ry348r43guy",
    type: "Glasses",
    mac: "00000ABB28FC",
    activationDate: "Jan 6, 2025",
    softwareVersion: "4.2",
    maintenanceHistory: [
      { time: "11 JUL, 8:50PM", event: "Device bA5hYb6VYV32 is down!" },
      { time: "11 JUL, 7:44PM", event: "New order #8744152 received" },
      { time: "11 JUL, 7:14PM", event: 'User "Sukaina Lyla" requested assistance' },
      { time: "11 JUL, 3:30PM", event: 'New user added by admin "Djajjo Nkala"' },
      { time: "11 JUL, 4:50AM", event: "Device registered successfully" },
    ],
    systemLogs: [
      { issue: "Battery Warning", description: "Battery level dropped below 20%" },
      { issue: "Connectivity Issue", description: "Device lost connection at 5:30PM" },
      { issue: "Firmware Update", description: "Firmware update version 4.3 installed" },
    ],
    assignedUser: undefined,
  };

  return <Home deviceData={deviceData} />;
};

export default Page;
