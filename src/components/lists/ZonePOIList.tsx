"use client";
import { useEffect, useState } from "react";
import TableData from "@/components/tables/tableData";
import { POI, Zone } from "@/types/environment";

interface ZonePOIListProps {
  title: string;
  idEnv: string;
  type?: "zone" | "poi";
}

const ZonePOIList: React.FC<ZonePOIListProps> = ({ title, idEnv, type }) => {
  const [elements, setElements] = useState<POI[] | Zone[]>([]);

  useEffect(() => {
    const fetchZoneData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/zones/floor/${idEnv}`);
        const data = await response.json();
        const transformedData: Zone[] = data.map((item: any) => {
          const coordinates = item.shape[0]?.coordinates || [];
          const width =
            coordinates.length === 2 ? Math.abs(coordinates[1][0] - coordinates[0][0]) : 0;
          const height =
            coordinates.length === 2 ? Math.abs(coordinates[1][1] - coordinates[0][1]) : 0;

          return {
            id: item.id,
            type: item.type_id || "Unknown",
            name: item.name,
            width,
            height,
            category: "Default Category",
            image: "default-image.jpg",
            zone: item.floor_id,
          };
        });
        setElements(transformedData);
      } catch (error) {
        console.error("Error fetching zone data:", error);
      }
    };

    const fetchPOIData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/pois/floor/${idEnv}`);
        const data = await response.json();
        const transformedData: POI[] = data.map((item: any) => ({
          id: item.id || `poi-${Math.random().toString(36).substr(2, 9)}`,
          type: item.type || "Default Type",
          name: item.name,
          width: 0,
          height: 0,
          category: "Default Category",
          image: "default-image.jpg",
          zone: item.point_id || "Unknown Zone",
        }));
        setElements(transformedData);
      } catch (error) {
        console.error("Error fetching POI data:", error);
      }
    };

    if (type === "zone") {
      fetchZoneData();
    } else if (type === "poi") {
      fetchPOIData();
    }
  }, [idEnv, type]);

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "type", label: "Type" },
    { key: "width", label: "Width" },
    { key: "height", label: "Height" },
  ];

  return (
    <div className="flex flex-col bg-irchad-gray-dark border border-irchad-gray-light shadow-lg rounded-2xl w-full pb-3">
      <div className="flex w-full items-center p-4">
        <p className="text-irchad-white font-roboto-medium">List of {title}s</p>
      </div>
      <TableData columns={columns as any} data={elements} />
    </div>
  );
};

export default ZonePOIList;