"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DeviceList from "@/components/lists/DeviceList";
import { deviceApi } from "@/services/deviceApi";

const DevicePage = () => {
  const [devicesData, setDevicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Format date helper function
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    
    const date = new Date(dateString);
    
    // Format date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    // Format time as HH'H'MM
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}H${minutes}`;
  };

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceApi.getAll();
        if (response.success) {
          // Format dates in the response data
          const formattedData = response.data.map(device => {
            return {
              ...device,
              // Format the date fields that actually exist in the API response
              created_at: formatDate(device.created_at),
              start_date: formatDate(device.start_date),
              end_date: formatDate(device.end_date),
              
              // This will be used as the "Last edited" value
              lastEdited: formatDate(device.created_at)
            };
          });
          
          setDevicesData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching devices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      {/* Header */}
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg" alt="header" width={1663} height={236} />
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Devices
          <p className="text-[20px] font-roboto-light">Where you manage your system devices</p>
        </div>
      </div>

      {/* Devices List */}
      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          {loading ? (
            <p className="text-center text-lg">Loading devices...</p>
          ) : (
            <DeviceList title="Device" devicesData={devicesData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
