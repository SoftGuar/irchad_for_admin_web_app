import Image from "next/image";
import DeviceImage from "@/components/cards/DeviceImageCard";
import DeviceInfo from "@/components/cards/DeviceInfoCard";
import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
import SystemLogs from "@/components/cards/SystemLogsCard";
import { DeviceData } from "../../components/cards/types";

interface DeviceDetailProps {
  deviceData: DeviceData;
}

const DeviceDetail = ({ deviceData }: DeviceDetailProps) => {
  return (
    <div className="relative h-screen text-white p-6 bg-black rounded-b-lg max-w-full overflow-x-hidden">
      {/* Background Image avec texte */}
      <div className="absolute inset-0 z-0 h-1/3 rounded-b-lg overflow-hidden">
        <Image
          src="/images/login_image.png"
          alt="Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="rounded-b-lg"
        />
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white text-left">
          <h1 className="text-4xl font-bold drop-shadow-lg">Devices</h1>
          <p className="text-lg drop-shadow-md">Where you manage your devices</p>
        </div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 bg-blue bg-opacity-50 max-w-full mt-36">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3">
              <DeviceImage data={deviceData} />
            </div>
            <div className="md:w-1/2">
              <DeviceInfo data={deviceData} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
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
};

export default DeviceDetail;
