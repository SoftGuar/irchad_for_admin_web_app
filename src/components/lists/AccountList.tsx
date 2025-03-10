"use client";
import AddUser from "@/components/popups/AddUser";
import DeleteUser from "@/components/popups/DeleteUser";
import EditUser from "@/components/popups/EditUser";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useState } from "react";

interface Account {
  id: number;
  name: string;
  email: string;
  phone: string;
  addingDate: string;
  lastEdited: string;
}

interface AccountListProps {
  title: string;
  accountsData: Account[];
}

const AccountList: React.FC<AccountListProps> = ({ title, accountsData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<"add" | "edit" | "delete" | null>(null);
  const [accountToEdit, setAccountToEdit] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<Account | null>(null);
  const [accounts, setAccounts] = useState(accountsData);

  const [selectedSort, setSelectedSort] = useState<string>("Name");
  const sortingOptions = ["Name", "Adding date", "Last Edited"];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const openAddAccountPopup = () => setShowPopup("add");
  const openEditAccountPopup = (account: Account) => {
    setAccountToEdit(account);
    setShowPopup("edit");
  };
  const openDeleteAccountPopup = (account: Account) => {
    setAccountToDelete(account);
    setShowPopup("delete");
  };
  const closePopup = () => {
    setShowPopup(null);
    setAccountToEdit(null);
    setAccountToDelete(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    if (value.trim() !== "") {
      setAccounts(accountsData.filter((account) => account.name.toLowerCase().includes(value)));
    } else {
      setAccounts(accountsData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...accounts];

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
    }

    setAccounts(sortedItems);
  };

  const displayedAccounts = accounts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: "id", label: "Id" },
    { key: "name", label: "Name" },
    { key: "email", label: "E-mail" },
    { key: "phone", label: "Phone number" },
    { key: "addingDate", label: "Adding date" },
    { key: "lastEdited", label: "Last edited" }
  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type={title.toLowerCase()}
        itemCount={accounts.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddAccountPopup}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <TableData 
        columns={columns as any} 
        data={displayedAccounts} 
        onEdit={openEditAccountPopup} 
        onDelete={openDeleteAccountPopup} 
        page={`${title.toLowerCase()}s`}
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
          {showPopup === "add" && <AddUser closePopup={closePopup} />}
          {showPopup === "edit" && accountToEdit && <EditUser user={accountToEdit} closePopup={closePopup} />}
          {showPopup === "delete" && accountToDelete && <DeleteUser user={accountToDelete} closePopup={closePopup} />}
        </PopUpScreen>
      )}
    </div>
  );
};

export default AccountList;
