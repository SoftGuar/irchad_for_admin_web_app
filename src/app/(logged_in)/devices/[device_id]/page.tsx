"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import DeviceImage from "@/components/cards/DeviceImageCard";
import DeviceInfo from "@/components/cards/DeviceInfoCard";
import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
import SystemLogs from "@/components/cards/SystemLogsCard";
import InterventionsList from "@/components/cards/InterventionsList";
import { getInterventions } from "@/services/UserManagementService";
import { getUserById } from "@/services/UserManagementService";

interface InterventionCardProps {
  title: string;
  description: string;
  maintainer: string;
  startDate: string;
  endDate: string;
  status: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function DeviceDetail() {
  const { device_id } = useParams();
  const [deviceData, setDeviceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [interventions, setInterventions] = useState<InterventionCardProps[]>([]);

  // Format date helper function
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Format time as HH'H'MM
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}H${minutes}`;
  };

  useEffect(() => {
  const fetchAllData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      // Fetch device info
      const deviceResponse = await fetch(`${API_URL}/admin/dispositive/${device_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!deviceResponse.ok) throw new Error("Failed to fetch device");
      const data = await deviceResponse.json();
        if (data.success) {
          // Format the dates in the device data
          const formattedData = {
            ...data.data,
            created_at: formatDate(data.data.created_at),
            start_date: formatDate(data.data.start_date),
            end_date: formatDate(data.data.end_date),
            lastEdited: formatDate(data.data.created_at),
          };

          setDeviceData(formattedData);
        }

      // Fetch interventions
      const interventionsResponse = await getInterventions(device_id);
      if (interventionsResponse.success) {
        const formatted = await Promise.all(
          interventionsResponse.data.map(async (item: any) => {
            const maintRes = await getUserById("maintainer", item.idMaintainer);
            const fullName = maintRes.success
              ? `${maintRes.data.last_name} ${maintRes.data.first_name}`
              : "Unknown";

            return {
              title: item?.title || item.report?.title || "No title",
              description: item.report?.description || "No description",
              maintainer: fullName,
              startDate: item.start_date.split('T')[0],
              endDate: item.end_date.split('T')[0],
              status: item.status
            };
          })
        );
        setInterventions(formatted);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (device_id) {
    fetchAllData();
  }
}, [device_id]);



  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!deviceData) return <div className="text-white p-6">Device not found</div>;

  return (
    <div className="relative min-h-screen text-white bg-black w-full overflow-scroll">
      {/* Header */}
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

      {/* Device Details */}
      <div className="relative z-0 w-full mt-44">
        <div className="w-full max-w-7xl mx-auto space-y-6 px-6">
          <div className="flex flex-col md:flex-row gap-4 w-full items-stretch">
            <div className="md:w-1/2 flex flex-1">
              <DeviceImage data={deviceData} />
            </div>
            <div className="md:w-1/2 flex flex-1">
              <DeviceInfo data={deviceData} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="md:w-1/3">
              {/* <MaintenanceHistory data={deviceData.maintenanceHistory} /> */}
            </div>
            <div className="md:w-2/3">
              {/* <SystemLogs data={deviceData.systemLogs} /> */}
            </div>
          </div>

          <div className="w-full">
              <InterventionsList interventions={interventions|| []} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceDetail;
