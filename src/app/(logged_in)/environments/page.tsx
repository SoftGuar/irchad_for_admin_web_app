"use client";
import Image from "next/image";
import EnvironmentList from "@/components/lists/EnvironmentList";

//sample data
const environmentsData = Array.from({ length: 11 }, (_, index) => ({
    id: `${index + 1}`,
    name: `Environment ${index+ 1}`,
    addingDate: "2021-08-01",
    lastEdited: "2021-08-01",
    address: "",
    description: "",
    history: [{message: "", timestamp: ""}],
    type: "",
    layers: 1
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

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <EnvironmentList title="Environment" environmentData={environmentsData} />
        </div>
      </div>
    </div>
  );
};

export default EnvironmentPage;
