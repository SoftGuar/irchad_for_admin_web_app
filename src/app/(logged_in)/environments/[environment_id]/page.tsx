"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AddFloor from "@/components/popups/AddFloor";
import FloorList from "@/components/lists/FloorList";

const EnvironmentFloorsPage = () => {
  const { environment_id } = useParams();
  const [environment, setEnvironment] = useState<any>(null);
  const [showAddFloorPopup, setShowAddFloorPopup] = useState(false);

  useEffect(() => {
    const fetchEnvironment = async () => {
      try {
        const response = await fetch(`http://localhost:8000/environments/${environment_id}`);
        const data = await response.json();
        setEnvironment(data);
      } catch (error) {
        console.error("Error fetching environment:", error);
      }
    };

    fetchEnvironment();
  }, [environment_id]);

  if (!environment) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{environment.name}</h1>
      <FloorList
        title="Floors"
        floorData={environment.floors}
        environmentId={environment.id}
      />
    </div>
  );
}
export default EnvironmentFloorsPage;