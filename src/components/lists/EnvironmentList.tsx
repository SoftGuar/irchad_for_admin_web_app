"use client";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useEffect, useState } from "react";
import { Environment } from "@/types/environment";
import AddEnv from "@/components/popups/AddEnv";
import DeleteEnv from "@/components/popups/DeleteEnv";

interface EnvListProps {
  title: string;
  environmentData: Environment[];
}

const AccountList: React.FC<EnvListProps> = ({ title, environmentData }) => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showPopup, setShowPopup] = useState<"add" | "delete" | null>(null);
    const [envToDelete, setEnvToDelete] = useState<Environment | null>(null);
    const [environments, setenvironments] = useState(environmentData);

    const [selectedSort, setSelectedSort] = useState<string>("Name");
    const sortingOptions = ["Name", "Adding date", "Last Edited"];
 
   const itemsPerPage = 10;
   const totalPages = Math.ceil(environmentData.length / itemsPerPage);

   // Synchronize environments state with environmentData prop
  useEffect(() => {
    setenvironments(environmentData);
  }, [environmentData]);

 
   const openAddUserPopup = () => setShowPopup("add");
 
   const openDeleteEnvPopup = (env: Environment) => {
    setEnvToDelete(env);
    setShowPopup("delete");
   };
 
   const handleDownloadEnv = (env: Environment) => {
    
   };
 
   const closePopup = () => {
     setShowPopup(null);
     setEnvToDelete(null);
   };
 

   const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (searchValue.length > 0) {
      const results = environments.filter((env) =>
        env.id.toLowerCase().includes(searchValue.toLowerCase())
      );
      setenvironments(results);
    } else {
      setenvironments(environmentData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...environments];

    switch (sortOption) {
      case "Name":
        sortedItems.sort((a, b) => a.id.localeCompare(b.id));
        break;
      case "Last Edited":
        sortedItems.sort((a, b) => new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime());
        break;
      case "Adding date":
        sortedItems.sort((a, b) => new Date(b.addingDate).getTime() - new Date(a.addingDate).getTime());
        break;
      default:
        break;
    }

    setenvironments(sortedItems);
  };

  const displayedDevices = environments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "", label: "" },
    { key: "", label: "" },
    { key: "addingDate", label: "Adding date" },
    { key: "lastEdited", label: "Last edited" }
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type="environment"
        itemCount={environments.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddUserPopup}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <TableData columns={columns as any} data={displayedDevices} onEdit={handleDownloadEnv} onDelete={openDeleteEnvPopup} page="environments" />

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
            <AddEnv closePopup={closePopup}/>
          }
          {showPopup === "delete" && envToDelete && (
            <DeleteEnv environment={envToDelete} closePopup={closePopup} />
          )}
        </PopUpScreen>
      )}
    </div>
  );
};

export default AccountList;
