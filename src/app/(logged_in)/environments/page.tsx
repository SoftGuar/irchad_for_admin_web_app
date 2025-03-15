"use client";
import Image from "next/image";
import EnvironmentList from "@/components/lists/EnvironmentList";

//sample data
const environmentsData = Array.from({ length: 95 }, (_, index) => ({
    id: (index + 1).toString(),
    name: `Environment ${index+ 1}`,
    addingDate: "2021-08-01",
    lastEdited: "2021-08-01"
}));

const EnvironmentPage = () => {
  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Environments
          <p className="text-[20px] font-roboto-light">Where you manage your system environments</p>
        </div>
      </div>

      <div className="relative flex justify-center items-center w-full min-h-screen">
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-full w-[95%]">
          <EnvironmentList title="Environment" environmentData={environmentsData} />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentPage;
