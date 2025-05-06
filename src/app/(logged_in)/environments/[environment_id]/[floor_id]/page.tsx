"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EnvironmentInfo from "@/components/cards/EnvironmentInfo";
import EnvironmentView from "@/components/cards/EnvironmentView";
import ActivityHistoryCard from "@/components/cards/ActivityHistoryCard";
import ZonePOIList from "@/components/lists/ZonePOIList";
import { Environment } from "@/types/environment";
import Image from "next/image";

const mockEnvironmentData: Environment = {
  id: "123",
  name: "ESI",
  address: "Oued Smar, Algiers",
  type: "School",
  addingDate: "Jan 6, 2025",
  lastEdited: "Jan 6, 2025",
  layers: 2,
  history: [
    { message: "Logged in", timestamp: "2025-03-11 10:30 AM" },
    { message: "Updated profile information", timestamp: "2025-03-10 03:15 PM" },
    { message: "Changed password", timestamp: "2025-03-09 06:45 PM" },
    { message: "Updated profile information", timestamp: "2025-02-20 06:45 PM" },
  ],
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
};

function EnvironmentDetails() {
    const router = useRouter();
    const { environment_id , floor_id } = useParams(); 
    mockEnvironmentData.id = environment_id as string;

    const [environment, setEnvironment] = useState<Environment | null>(null);


  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg"  alt="header" width={1663} height={236}/>
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Environments
          <p className="text-[20px] font-roboto-light">Where you manage your system environments</p>
        </div>
      </div>

      {/* content */}
      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%] space-y-8">
          <div className="flex flex-row space-x-5">
            <div className="flex md:w-[60%] justify-center">
                <EnvironmentView data={mockEnvironmentData} />
            </div>
            <div className="flex md:w-[40%]">
                <EnvironmentInfo data={mockEnvironmentData} />
            </div>
          </div>

          <div className="flex flex-row space-x-3">
            <div className="flex flex-col md:w-1/3 bg-irchad-gray rounded-md px-4 py-6 space-y-3">
              <p className="text-irchad-white font-roboto-medium">List of POIs</p>
              <ZonePOIList title="POI" type="poi" idEnv={floor_id as string}/>
            </div>
            <div className="flex flex-col md:w-1/3 bg-irchad-gray rounded-md px-4 py-6 space-y-3">
              <p className="text-irchad-white font-roboto-medium">List of POIs</p>
              <ZonePOIList title="Zone" type="zone" idEnv={floor_id as string}/>
            </div>
            <div className="flex md:w-1/3">
              <ActivityHistoryCard title="History" activities={mockEnvironmentData.history}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnvironmentDetails;
