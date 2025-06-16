"use client";
import { useEffect, useState } from "react";
import TableData from "@/components/tables/tableData";
import { POI, Zone } from "@/types/environment";
import { i } from "framer-motion/client";

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_CARTOGRAPHIE_SERVICE}/zones/floor/${idEnv}`);
        const data = await response.json();
        const transformedData: Zone[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description || "N/A",
          category: item.type_id || "Unknown",
        }));
        setElements(transformedData);
        console.log("Zone data:", transformedData);
      } catch (error) {
        console.error("Error fetching zone data:", error);
      }
    };

    const fetchPOIData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CARTOGRAPHIE_SERVICE}/pois/floor/${idEnv}`);
        const data = await response.json();
        const transformedData: POI[] = data.map((item: any) => ({
          id: item.id || `poi-${Math.random().toString(36).substr(2, 9)}`,
          name: item.name,
          category: item.category_id || "Unknown",
        }));
        setElements(transformedData);
        console.log("POI data:", transformedData);
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

  const columns =
    type === "zone"
      ? [
        { key: "id", label: "Id" },
        
          { key: "name", label: "Name" },
          { key: "", label: "" },
          {
            key: "description",
            label: "Description",
            render: (value: string) =>
              value.length > 30 ? `${value.substring(0, 30)}...` : value, // Truncate long descriptions
          },
          { key: "category", label: "Category" },
        ]
      : [
        { key: "id", label: "Id" },
          { key: "name", label: "Name" },
          { key: "category", label: "Category" },
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