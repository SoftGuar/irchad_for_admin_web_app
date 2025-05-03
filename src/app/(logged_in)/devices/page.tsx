"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import DeviceList from "@/components/lists/DeviceList";
import { deviceApi } from "@/services/deviceApi";

const DevicePage = () => {
  const [devicesData, setDevicesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await deviceApi.getAll();
        if (response.success) {
          setDevicesData(response.data);
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
