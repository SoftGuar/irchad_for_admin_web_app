"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import DeviceImage from "@/components/cards/DeviceImageCard";
import DeviceInfo from "@/components/cards/DeviceInfoCard";
import MaintenanceHistory from "@/components/cards/MaintenanceHistoryCard";
import SystemLogs from "@/components/cards/SystemLogsCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function DeviceDetail() {
  const { device_id } = useParams();
  const [deviceData, setDeviceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    const fetchDevice = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No auth token found");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/admin/dispositive/${device_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch device");

        const data = await response.json();
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
      } catch (error) {
        console.error("Error fetching device:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
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
        </div>
      </div>
    </div>
  );
}

export default DeviceDetail;
