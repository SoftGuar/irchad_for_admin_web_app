"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EnvironmentListPage = () => {
  const [environments, setEnvironments] = useState<any[]>([]);
  const router = useRouter();

  const fetchEnvironments = async () => {
    try {
      const response = await fetch("http://localhost:8000/environments", {
        method: "GET",
        cache: "no-store", // Disable caching
      });
      const data = await response.json();
      setEnvironments(data);
    } catch (error) {
      console.error("Error fetching environments:", error);
    }
  };
  
  useEffect(() => {

    fetchEnvironments();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchEnvironments();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen pb-5">
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg" alt="header" width={1663} height={236} />
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Environments
          <p className="text-[20px] font-roboto-light">Where you manage your system environments</p>
        </div>
      </div>

      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <div className="grid grid-cols-1 gap-4">
            {environments.map((env) => (
              <div key={env.id} className="p-4 border border-gray-300 rounded-lg bg-white">
                <h3 className="text-lg font-bold">{env.name}</h3>
                <p className="text-sm text-gray-600">{env.address}</p>
                <button
                  onClick={() => router.push(`/environments/${env.id}`)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  See Environment
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentListPage;