"use client";
import Image from "next/image";
import EnvironmentList from "@/components/lists/EnvironmentList";
import { useEffect, useState } from "react";


const EnvironmentPage = () => {

  const [environmentsData, setEnvironmentsData] = useState<any[]>([]);

  useEffect(() => {
    const fetchEnvironmentsData = async () => {
      try {
        const response = await fetch("http://localhost:8000/floors");
        const data = await response.json();
        console.log("Fetched data:", data);

        const transformedData = await data.map((item: any, index: number) => ({
          id: item.id || `${index + 1}`,
          name: item.name || `Environment ${index + 1}`,
          addingDate: "2021-08-01", // Replace with actual adding date if available
          lastEdited: "2021-08-01", // Replace with actual last edited date if available
          address: "", // Replace with actual address if available
          description: "", // Replace with actual description if available
          history: [{ message: "", timestamp: "" }], // Replace with actual history if available
          type: "", // Replace with actual type if available
          layers: item.level || 1, // Use the level from the API response
        }));
        console.log("Transformed data:", transformedData); 

        setEnvironmentsData(transformedData);
      } catch (error) {
        console.error("Error fetching environments data:", error);
      }
    };

    fetchEnvironmentsData();
  }, []);



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
