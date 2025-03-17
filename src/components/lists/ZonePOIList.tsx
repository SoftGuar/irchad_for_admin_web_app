"use client";
import { useState } from "react";
import PopUpScreen from "@/components/popups/popUpScreen";
import TableData from "@/components/tables/tableData";
import { POI, Zone } from "@/types/environment";

interface AccountListProps {
  title: string;
  idEnv: string;
}

const ZonePOIList: React.FC<AccountListProps> = ({ title, idEnv }) => {
  const [showPopup, setShowPopup] = useState<"edit" | "delete" | null>(null);
  const [elementToEdit, setElementToEdit] = useState<POI | Zone | null>(null);
  const [elementToDelete, setElementToDelete] = useState<POI | Zone | null>(null);
  const [elements, setElements] = useState<POI[] | Zone[]>(poisData);

  const openEditAccountPopup = (element: Zone | POI) => {
    setElementToEdit(element);
    setShowPopup("edit");
  };

  const openDeleteAccountPopup = (element: Zone | POI) => {
    setElementToDelete(element);
    setShowPopup("delete");
  };
  const closePopup = () => {
    setShowPopup(null);
    setElementToEdit(null);
    setElementToDelete(null);
  };

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
  ];

  return (
    <div className="flex flex-col bg-irchad-gray-dark border border-irchad-gray-light shadow-lg rounded-2xl w-full pb-3">
      {/* header  */}
      <div className="flex w-full items-center p-4">
        <p className="text-irchad-white font-roboto-medium">List of {title}s</p>
      </div>

      {/* content */}
      <TableData 
        columns={columns as any} 
        data={elements} 
        onEdit={openEditAccountPopup} 
        onDelete={openDeleteAccountPopup} 
        page={`${title.toLowerCase()}s`}
      />

      {showPopup && (
        <></>
        // <PopUpScreen>
        //   {showPopup === "edit" && elementToEdit && <EditUser type={title} user={accountToEdit} closePopup={closePopup} />}
        //   {showPopup === "delete" && elementToDelete && <DeleteUser account={accountToDelete} closePopup={closePopup} />}
        // </PopUpScreen>
      )}
    </div>
  );
};

export default ZonePOIList;


const zonesData: Zone[] = [
    {
        id: "zone-1",
        type: "Park",
        name: "Central Park",
        width: 1000,
        height: 800,
        category: "Public Space",
        image: "central-park.jpg",
    },
    {
        id: "zone-2",
        type: "Museum",
        name: "The Metropolitan Museum of Art",
        width: 500,
        height: 300,
        category: "Cultural",
        image: "met-museum.jpg",
    },
    {
        id: "zone-3",
        type: "Stadium",
        name: "Yankee Stadium",
        width: 1200,
        height: 900,
        category: "Sports",
        image: "yankee-stadium.jpg",
    },
];

const poisData: POI[] = [
    {
        id: "poi-1",
        type: "Statue",
        name: "Statue of Liberty",
        width: 50,
        height: 150,
        category: "Landmark",
        image: "statue-of-liberty.jpg",
        zone: "zone-1",
    },
    {
        id: "poi-2",
        type: "Fountain",
        name: "Bethesda Fountain",
        width: 20,
        height: 10,
        category: "Public Art",
        image: "bethesda-fountain.jpg",
    },
    {
        id: "poi-3",
        type: "Exhibit",
        name: "Egyptian Art Exhibit",
        width: 200,
        height: 100,
        category: "Cultural",
        image: "egyptian-art.jpg",
        zone: "zone-2",
    },
    {
        id: "poi-4",
        type: "Monument",
        name: "Washington Square Arch",
        width: 30,
        height: 70,
        category: "Historical",
        image: "washington-arch.jpg",
    },
];