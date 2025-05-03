"use client";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useState } from "react";
import { Device } from "@/types/device";
import AddDevice from "../popups/AddDevice";
import DeleteDevice from "../popups/DeleteDevice";
import DesactivateDevice from "../popups/DesactivateDevice";

interface DeviceListProps {
  title: string;
  devicesData: Device[];
}

const AccountList: React.FC<DeviceListProps> = ({ title, devicesData }) => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState<"add" | "desactivate" | "delete" | null>(null);
    const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
    const [deviceToDesactivate, setDeviceToDesactivate] = useState<Device | null>(null);
    const [devices, setdevices] = useState(devicesData);

    const [selectedSort, setSelectedSort] = useState<string>("ID");
    const sortingOptions = ["ID", "Adding date", "Last Edited"];
 
   const itemsPerPage = 10;
   const totalPages = Math.ceil(devicesData.length / itemsPerPage);
 
   const openAddUserPopup = () => setShowPopup("add");
 
   const openDeleteDevicePopup = (device: Device) => {
     setDeviceToDelete(device);
     setShowPopup("delete");
   };
 
   const openDesactivateDevicePopup = (device: Device) => {
     setDeviceToDesactivate(device);
     setShowPopup("desactivate");
   };
 
   const closePopup = () => {
     setShowPopup(null);
     setDeviceToDesactivate(null);
     setDeviceToDelete(null);
   };
 

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (searchValue.length > 0) {
      const results = devices.filter((device) =>
        device.id.toLowerCase().includes(searchValue.toLowerCase())
      );
      setdevices(results);
    } else {
      setdevices(devicesData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...devices];

    switch (sortOption) {
      case "ID":
        sortedItems.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "Last Edited":
        sortedItems.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
        break;
      case "Adding date":
        sortedItems.sort((a, b) => new Date(b.activationDate).getTime() - new Date(a.activationDate).getTime());
        break;
      default:
        break;
    }

    setdevices(sortedItems);
  };

  const displayedDevices = devices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: "id", label: "Device ID" }, //first one will be ignored so i duplicated it
    { key: "id", label: "Device ID" },
    { key: "state", label: "Status" },
    { key: "type", label: "Type" },
    { key: "start_date", label: "Adding date" },
    { key: "end_date", label: "Last edited" }
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type="device"
        itemCount={devices.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddUserPopup}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <TableData columns={columns as any} data={displayedDevices} onEdit={openDesactivateDevicePopup} onDelete={openDeleteDevicePopup} page="devices" />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        onPageSelect={setCurrentPage}
      />

      {showPopup && (
        <PopUpScreen>
          {showPopup === "add" && 
            <AddDevice closePopup={closePopup}/>
          }
          {showPopup === "desactivate" && deviceToDesactivate && (
            <DesactivateDevice device={deviceToDesactivate} closePopup={closePopup} />
          )}
          {showPopup === "delete" && deviceToDelete && (
            <DeleteDevice device={deviceToDelete} closePopup={closePopup} />
          )}
        </PopUpScreen>
      )}
    </div>
  );
};

export default AccountList;
