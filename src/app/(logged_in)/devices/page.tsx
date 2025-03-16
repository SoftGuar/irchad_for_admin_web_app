"use client";
import Image from "next/image";
import DeviceList from "@/components/lists/DeviceList";

//sample data
const devicesData = Array.from({ length: 50 }, (_, index) => ({
  id: `${index + 1}`,
  type: "Type",
  mac: "00:00:00:00:00:00",
  status: "Active",
  lastEdited: "2021-08-01",
  activationDate: "2021-08-01",
  assignedTo: "User",
  version: "1.0",
  photo: ""
}));

const DevicePage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Devices
          <p className="text-[20px] font-roboto-light">Where you manage your system devices</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <DeviceList title="Device" devicesData={devicesData} />
        </div>
      </div>
    </div>
  );
};

export default DevicePage;
