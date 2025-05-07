"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddEnv from "@/components/popups/AddEnv"; // Ensure the correct path to AddEnv

const EnvironmentListPage = () => {
  const [environments, setEnvironments] = useState<any[]>([]);
  const [isAddEnvOpen, setIsAddEnvOpen] = useState(false);
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
      {/* Add Environment Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsAddEnvOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Environment
        </button>
      </div>

      {/* AddEnv Popup */}
      {isAddEnvOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <AddEnv
            closePopup={() => setIsAddEnvOpen(false)}
            onAdd={(newEnv) => {
              setEnvironments((prev) => [...prev, newEnv]); // Add the new environment to the list
              setIsAddEnvOpen(false);
            }}
          />
        </div>
      )}

      {/* Header Section */}
      <div className="flex relative w-full">
        <Image src="/images/headers/header.svg" alt="header" width={1663} height={236} />
        <div className="absolute inset-0 flex flex-col p-6 items-start justify-start text-white text-[35px] font-roboto-bold">
          Environments
          <p className="text-[20px] font-roboto-light">Where you manage your system environments</p>
        </div>
      </div>

      {/* Environment List */}
      <div className="flex -mt-10 justify-center items-start min-h-screen w-full z-0">
        <div className="w-[95%]">
          <div className="grid grid-cols-1 gap-4">
            {environments.map((env) => (
              <div key={env.id} className="p-4 border border-gray-300 rounded-lg bg-[#2E2E2E]">
                <h3 className="text-lg font-bold text-white">{env.name}</h3>
                <p className="text-sm text-gray-400">{env.address}</p>
                <button
                  onClick={() => router.push(`/environments/${env.id}`)}
                  className="mt-2 px-4 py-2 bg-[#B46A11] text-white rounded-lg"
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