"use client";
import AddTransaction from "../popups/AddTransaction";
import DeleteTransaction from "../popups/DeleteTransaction";
import EditTransaction from "../popups/EditTransaction";
import PopUpScreen from "@/components/popups/popUpScreen";
import HeaderSection from "@/components/tables/tableHeader";
import Pagination from "@/components/tables/paginationComponent";
import TableData from "@/components/tables/tableData";
import { useState } from "react";
import { Transaction } from "@/types/transaction";

interface TransactionListProps {
  title: string;
  transactionsData: Transaction[];
  onChange: ()=>void
}

const TransactionsList: React.FC<TransactionListProps> = ({ title, transactionsData, onChange }) => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState<"add" | "edit" | "delete" | null>(null);
  const [transactionToEdit, setTransactionToEdit] = useState<Transaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState(transactionsData);

  const [selectedSort, setSelectedSort] = useState<string>("Name");
  const sortingOptions = ["Client Name", "Adding date"];

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const openAddTransactionPopup = () => setShowPopup("add");
  const openEditTransactionPopup = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setShowPopup("edit");
  };
  const openDeleteTransactionPopup = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setShowPopup("delete");
  };
  const closePopup = () => {
    setShowPopup(null);
    setTransactionToEdit(null);
    setTransactionToDelete(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    if (value.trim() !== "") {
      setTransactions(transactionsData.filter((transaction) => transaction.clientName.toLowerCase().includes(value)));
    } else {
      setTransactions(transactionsData);
    }
  };

  const handleSortChange = (sortOption: string) => {
    setSelectedSort(sortOption);
    const sortedItems = [...transactions];

    switch (sortOption) {
      case "Client Name":
        sortedItems.sort((a, b) => a.clientName.localeCompare(b.clientName));
        break;
      case "Adding date":
        sortedItems.sort((a, b) => new Date(b.addingDate).getTime() - new Date(a.addingDate).getTime());
        break;
    }

    setTransactions(sortedItems);
  };

  const displayedAccounts = transactions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const columns = [
    { key: "id", label: "Id" },
    { key: "clientName", label: "Client Name" },
    { key: "commercial", label: "Commercial" },
    { key: "dispositifID", label: "Dispositif ID" },
    { key: "status", label: "Status" },
    { key: "addingDate", label: "Adding date" }

  ];

  return (
    <div className="flex flex-col bg-[#1E1E1E] border border-irchad-gray-light shadow-lg rounded-2xl w-full space-y-4 pb-3">
      <HeaderSection
        type={title.toLowerCase()}
        itemCount={transactions.length}
        searchValue={searchValue}
        onSearchChange={handleSearch}
        openAddPopup={openAddTransactionPopup}
        sortingOptions={sortingOptions}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
      />

      <TableData 
        columns={columns as any} 
        data={displayedAccounts} 
        onEdit={openEditTransactionPopup} 
        onDelete={openDeleteTransactionPopup} 
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
          {showPopup === "add" && <AddTransaction closePopup={closePopup} onChange={onChange}/>}
          {showPopup === "edit" && transactionToEdit && <EditTransaction transaction={transactionToEdit}  closePopup={closePopup} onChange={onChange}/>}
          {showPopup === "delete" && transactionToDelete && <DeleteTransaction  transaction={transactionToDelete} closePopup={closePopup} onChange={onChange}/>}
        </PopUpScreen>
      )}
    </div>
  );
};

export default TransactionsList;
