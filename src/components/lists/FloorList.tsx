"use client";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useEffect, useState } from "react";
import { Floor } from "@/types/floor"; // Replace with the correct type for floors
import AddFloor from "@/components/popups/AddFloor";

interface FloorListProps {
  title: string;
  floorData: Floor[];
  environmentId: string;
}

const FloorList: React.FC<FloorListProps> = ({ title, floorData, environmentId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<"add" | null>(null);
  const [floors, setFloors] = useState(floorData);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(floorData.length / itemsPerPage);

  // Synchronize floors state with floorData prop
  useEffect(() => {
    setFloors(floorData);
  }, [floorData]);

  const openAddFloorPopup = () => setShowPopup("add");

  const closePopup = () => {
    setShowPopup(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (searchValue.length > 0) {
      const results = floors.filter((floor) =>
        floor.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFloors(results);
    } else {
      setFloors(floorData);
    }
  };

  const displayedFloors = floors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "level", label: "Level" },
    { key: "building", label: "building" },
    { key: "", label: "" },
    { key: "", label: "" },
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type="floor"
        itemCount={floors.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddFloorPopup}
      />

      <TableData
        columns={columns as any}
        data={displayedFloors}
        page={`environments/${environmentId}`}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onPageSelect={setCurrentPage}
      />

      {showPopup && (
        <PopUpScreen>
          {showPopup === "add" && <AddFloor closePopup={closePopup} environmentId={environmentId} />}
        </PopUpScreen>
      )}
    </div>
  );
};

export default FloorList;