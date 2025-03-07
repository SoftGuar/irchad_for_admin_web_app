import DeviceImage from "@/components/cards/DeviceImageCard";
import DeviceInfo from "@/components/cards/DeviceInfoCard";
import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
import SystemLogs from "@/components/cards/SystemLogsCard";
import { DeviceData } from "../../components/cards/types";

const Home = () => {
  const deviceData: DeviceData = {
    image: "/glasses.png",
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
      { issue: "Battery Warning", description: "Battery level dropped below 20%" },
      { issue: "Connectivity Issue", description: "Device lost connection at 5:30PM" },
      { issue: "Firmware Update", description: "Firmware update version 4.3 installed" },
      { issue: "Battery Warning", description: "Battery level dropped below 20%" },
      { issue: "Connectivity Issue", description: "Device lost connection at 5:30PM" },
      { issue: "Firmware Update", description: "Firmware update version 4.3 installed" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Top Section: Device Image & Info */}
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Device Image */}
          <div className="md:w-2/3">
            <DeviceImage data={deviceData} />
          </div>

          {/* Device Info */}
          <div className="md:w-1/2">
            <DeviceInfo data={deviceData} />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Device Image */}
          <div className="md:w-1/3">
          <MaintenanceHistory history={deviceData.maintenanceHistory} />
          </div>

          {/* Device Info */}
          <div className="md:w-2/3">
          <SystemLogs logs={deviceData.systemLogs} />
          </div>
        </div>

        {/* Bottom Section: Maintenance History & System Logs */}
         
      </div>
    </div>
  );
};

export default Home;
