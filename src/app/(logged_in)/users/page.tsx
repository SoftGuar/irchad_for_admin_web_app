"use client";
import AddUser from "@/components/popups/AddUser";
import DeleteUser from "@/components/popups/DeleteUser";
import EditUser from "@/components/popups/EditUser";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  addingDate: string;
  lastEdited: string;
}

//sample data
const usersData = Array.from({ length: 95 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@gmail.com`,
  phone: `123-456-789${index}`,
  addingDate: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
  lastEdited: `2024-12-${String((index % 31) + 1).padStart(2, "0")}`,
}));

const UserPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<"add" | "edit" | "delete" | null>(null);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [users, setusers] = useState(usersData);

  const [selectedSort, setSelectedSort] = useState<string>("Name");
  const sortingOptions = ["Name", "Adding date", "Last Edited"];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  const openAddUserPopup = () => setShowPopup("add");
  const openEditUserPopup = (user: User) => {
    setUserToEdit(user);
    setShowPopup("edit");
  };

  const openDeleteUserPopup = (user: User) => {
    setUserToDelete(user);
    setShowPopup("delete");
  };

  const closePopup = () => {
    setShowPopup(null);
    setUserToEdit(null);
    setUserToDelete(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (searchValue.length > 0) {
      const results = users.filter((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setusers(results);
    } else {
      setusers(usersData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...users];

    switch (sortOption) {
      case "Name":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
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

    setusers(sortedItems);
  };

  const displayedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Phone number" },
    { key: "addingDate", label: "Adding date" },
    { key: "lastEdited", label: "Last edited" }
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type="user"
        itemCount={users.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddUserPopup}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      {/* Table part */}
      <TableData columns={columns as any} data={displayedUsers} onEdit={openEditUserPopup} onDelete={openDeleteUserPopup} page="users" />

      {/* pagination part  */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onNext={nextPage}
        onPrevious={previousPage}
        onPageSelect={goToPage}
      />

      {/* Popup Screen */}
      {showPopup && (
        <PopUpScreen>
          {showPopup === "add" && <AddUser closePopup={closePopup} />}
          {showPopup === "edit" && userToEdit && (
            <EditUser user={userToEdit} closePopup={closePopup} />
          )}
          {showPopup === "delete" && userToDelete && (
            <DeleteUser user={userToDelete} closePopup={closePopup} />
          )}
        </PopUpScreen>
      )}
    </div>
  );
};

export default UserPage;