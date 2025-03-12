// import Image from "next/image";
// import DeviceImage from "@/components/cards/DeviceImageCard";
// import DeviceInfo from "@/components/cards/DeviceInfoCard";
// import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
// import SystemLogs from "@/components/cards/SystemLogsCard";
// import { DeviceData } from "@/components/cards/types";

// interface DeviceDetailProps {
//   params: { device_id: string };
// }

 
// const devices: DeviceData[] = [
//   {
//     id: "SC_01p33hhz38hngv",
//     assignedUser: "John Doe",
//     image: "/images/glasses.jpg",
//     location: "Paris, France",
//     status: "Active",
//     battery: "80%",
//     deviceId: "DVC-001",
//     type: "Glasses",
//     mac: "00:1A:2B:3C:4D:5E",
//     activationDate: "2024-01-06",
//     softwareVersion: "v1.2.3",
//     maintenanceHistory: [
//       { time: "2024-02-10", event: "Battery replaced" },
//       { time: "2024-03-15", event: "Software updated" },
//       { time: "2024-02-10", event: "Battery replaced" },
//       { time: "2024-03-15", event: "Software updated" },
//       { time: "2024-02-10", event: "Battery replaced" },
//       { time: "2024-03-15", event: "Software updated" }
//     ],
//     systemLogs: [
//       { issue: "Overheating", description: "Device temperature exceeded 70°C" },
//       { issue: "Low Battery", description: "Battery level dropped below 10%" },
//       { issue: "Overheating", description: "Device temperature exceeded 70°C" },
//       { issue: "Low Battery", description: "Battery level dropped below 10%" },
//       { issue: "Overheating", description: "Device temperature exceeded 70°C" },
//       { issue: "Low Battery", description: "Battery level dropped below 10%" },
//     ],
//   },
//   {
//     id: "FTDSYGYsd34r34843guy",
//     assignedUser: "Jane Smith",
//     image: "/images/glasses.jpg",
//     location: "Berlin, Germany",
//     status: "Inactive",
//     battery: "50%",
//     deviceId: "DVC-002",
//     type: "Glasses",
//     mac: "11:22:33:44:55:66",
//     activationDate: "2025-01-06",
//     softwareVersion: "v1.4.0",
//     maintenanceHistory: [{ time: "2025-02-20", event: "Screen replaced" }],
//     systemLogs: [{ issue: "Network Issue", description: "WiFi disconnected frequently" }],
//   },
//   {
//     id: "FTDSYGYsd34r34843guy",
//     assignedUser: "Jane Smith",
//     image: "/images/device2.png",
//     location: "Berlin, Germany",
//     status: "Inactive",
//     battery: "50%",
//     deviceId: "DVC-002",
//     type: "Glasses",
//     mac: "11:22:33:44:55:66",
//     activationDate: "2025-01-06",
//     softwareVersion: "v1.4.0",
//     maintenanceHistory: [{ time: "2025-02-20", event: "Screen replaced" }],
//     systemLogs: [{ issue: "Network Issue", description: "WiFi disconnected frequently" }],
//   },
// ];

// const DeviceDetail = ({ params }: DeviceDetailProps) => {
//   const deviceData = devices.find((device) => device.id === params.device_id);

//   if (!deviceData) {
//     return <div className="text-white p-6">Device not found</div>;
//   }

//   return (
//     <div className="relative min-h-screen text-white bg-black w-full overflow-scroll">
      
//       <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
//         <Image
//           src="/images/login_image.png"
//           alt="Background"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//           priority
//           className="rounded-b-lg"
//         />
//         <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
//           <h1 className="text-4xl font-bold drop-shadow-lg">Devices</h1>
//           <p className="text-lg drop-shadow-md">Where you manage your devices</p>
//         </div>
//       </div>

//       {/* Contenu */}
//       <div className="relative z-0 w-full mt-44">
//         <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          
          
//         <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
//   <div className="md:w-1/2 flex flex-1">
//     <div className="w-full h-full">
//       <DeviceImage data={deviceData} />
//     </div>
//   </div>
//   <div className="md:w-1/2 flex flex-1">
//     <div className="w-full h-full">
//       <DeviceInfo data={deviceData} />
//     </div>
//   </div>
// </div>


         
//           <div className="flex flex-col md:flex-row gap-4 w-full">
//             <div className="md:w-1/3">
//               <MaintenanceHistory history={deviceData.maintenanceHistory} />
//             </div>
//             <div className="md:w-2/3">
//               <SystemLogs logs={deviceData.systemLogs} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeviceDetail;
// "use client";
// import Image from "next/image";
// import DeviceImage from "@/components/cards/DeviceImageCard";
// import DeviceInfo from "@/components/cards/DeviceInfoCard";
// import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
// import SystemLogs from "@/components/cards/SystemLogsCard";
// import { DeviceData } from "@/components/cards/types";

// // Mark this as a client component


// interface DeviceDetailProps {
//   params: { device_id: string };
// }

// const devices: DeviceData[] = [
//   {
//     id: "SC_01p33hhz38hngv",
//     assignedUser: "John Doe",
//     image: "/images/glasses.jpg",
//     location: "Paris, France",
//     status: "Active",
//     battery: "80%",
//     deviceId: "DVC-001",
//     type: "Glasses",
//     mac: "00:1A:2B:3C:4D:5E",
//     activationDate: "2024-01-06",
//     softwareVersion: "v1.2.3",
//     maintenanceHistory: [
//       { time: "2024-02-10", event: "Battery replaced" },
//       { time: "2024-03-15", event: "Software updated" },
//       { time: "2024-02-10", event: "Battery replaced" },
//       { time: "2024-03-15", event: "Software updated" },
//       { time: "2024-02-10", event: "Battery replaced" },
//       { time: "2024-03-15", event: "Software updated" }
//     ],
//     systemLogs: [
//       { issue: "Overheating", description: "Device temperature exceeded 70°C" },
//       { issue: "Low Battery", description: "Battery level dropped below 10%" },
//       { issue: "Overheating", description: "Device temperature exceeded 70°C" },
//       { issue: "Low Battery", description: "Battery level dropped below 10%" },
//       { issue: "Overheating", description: "Device temperature exceeded 70°C" },
//       { issue: "Low Battery", description: "Battery level dropped below 10%" },
//     ],
//   },
//   {
//     id: "FTDSYGYsd34r34843guy",
//     assignedUser: "Jane Smith",
//     image: "/images/glasses.jpg",
//     location: "Berlin, Germany",
//     status: "Inactive",
//     battery: "50%",
//     deviceId: "DVC-002",
//     type: "Glasses",
//     mac: "11:22:33:44:55:66",
//     activationDate: "2025-01-06",
//     softwareVersion: "v1.4.0",
//     maintenanceHistory: [{ time: "2025-02-20", event: "Screen replaced" }],
//     systemLogs: [{ issue: "Network Issue", description: "WiFi disconnected frequently" }],
//   },
//   // Other devices...
// ];

// function DeviceDetail({ params }: DeviceDetailProps) {
//   // Direct access to params is allowed in client components
//   const deviceData = devices.find((device) => device.id === params.device_id);

//   if (!deviceData) {
//     return <div className="text-white p-6">Device not found</div>;
//   }

//   return (
//     <div className="relative min-h-screen text-white bg-black w-full overflow-scroll">
      
//       <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
//         <Image
//           src="/images/login_image.png"
//           alt="Background"
//           layout="fill"
//           objectFit="cover"
//           quality={100}
//           priority
//           className="rounded-b-lg"
//         />
//         <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
//           <h1 className="text-4xl font-bold drop-shadow-lg">Devices</h1>
//           <p className="text-lg drop-shadow-md">Where you manage your devices</p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="relative z-0 w-full mt-44">
//         <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          
//           <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
//             <div className="md:w-1/2 flex flex-1">
//               <div className="w-full h-full">
//                 <DeviceImage data={deviceData} />
//               </div>
//             </div>
//             <div className="md:w-1/2 flex flex-1">
//               <div className="w-full h-full">
//                 <DeviceInfo data={deviceData} />
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row gap-4 w-full">
//             <div className="md:w-1/3">
//               <MaintenanceHistory history={deviceData.maintenanceHistory} />
//             </div>
//             <div className="md:w-2/3">
//               <SystemLogs logs={deviceData.systemLogs} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeviceDetail;
"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import DeviceImage from "@/components/cards/DeviceImageCard";
import DeviceInfo from "@/components/cards/DeviceInfoCard";
import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
import SystemLogs from "@/components/cards/SystemLogsCard";
import { DeviceData } from "@/components/cards/types";

const devices: DeviceData[] = [
  {
    id: "SC_01p33hhz38hngv",
    assignedUser: "John Doe",
    image: "/images/glasses.jpg",
    location: "Paris, France",
    status: "Active",
    battery: "80%",
    deviceId: "DVC-001",
    type: "Glasses",
    mac: "00:1A:2B:3C:4D:5E",
    activationDate: "2024-01-06",
    softwareVersion: "v1.2.3",
    maintenanceHistory: [
      { time: "2024-02-10", event: "Battery replaced" },
      { time: "2024-03-15", event: "Software updated" }
    ],
    systemLogs: [
      { issue: "Overheating", description: "Device temperature exceeded 70°C" },
      { issue: "Low Battery", description: "Battery level dropped below 10%" }
    ],
  },
  {
    id: "FTDSYGYsd34r34843guy",
    assignedUser: "Jane Smith",
    image: "/images/glasses.jpg",
    location: "Berlin, Germany",
    status: "Inactive",
    battery: "50%",
    deviceId: "DVC-002",
    type: "Glasses",
    mac: "11:22:33:44:55:66",
    activationDate: "2025-01-06",
    softwareVersion: "v1.4.0",
    maintenanceHistory: [{ time: "2025-02-20", event: "Screen replaced" }],
    systemLogs: [{ issue: "Network Issue", description: "WiFi disconnected frequently" }],
  },
];

function DeviceDetail() {
  const params = useParams(); // Fetch params dynamically
  const deviceId = params?.device_id as string;

  const deviceData = devices.find((device) => device.id === deviceId);

  if (!deviceData) {
    return <div className="text-white p-6">Device not found</div>;
  }

  return (
    <div className="relative min-h-screen text-white bg-black w-full overflow-scroll">
      
      <div className="absolute h-1/3 w-full rounded-b-lg overflow-hidden">
        <Image
          src="/images/login_image.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
          <h1 className="text-4xl font-bold drop-shadow-lg">Devices</h1>
          <p className="text-lg drop-shadow-md">Where you manage your devices</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-0 w-full mt-44">
        <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          
          <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
            <div className="md:w-1/2 flex flex-1">
              <div className="w-full h-full">
                <DeviceImage data={deviceData} />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-1">
              <div className="w-full h-full">
                <DeviceInfo data={deviceData} />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="md:w-1/3">
              <MaintenanceHistory history={deviceData.maintenanceHistory} />
            </div>
            <div className="md:w-2/3">
              <SystemLogs logs={deviceData.systemLogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetail;
