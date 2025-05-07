import { useState } from "react";
import { useRouter } from "next/navigation";
import {Trash2, Filter, Pen, ArrowRight, Ban, Download, Link } from "lucide-react";
import Checkbox from "../shared/Checkbox";
import PopUpScreen from "../popups/popUpScreen";
import ConfirmTransaction from "../popups/ConfirmTransaction";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface BaseTransaction {
  id: string;
  dispositifID: string;
}

interface TableDataProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  page: string;
}

const TableData = <T,>({ 
  columns, 
  data, 
  onEdit = () => {}, 
  onDelete = () => {}, 
  page 
}: TableDataProps<T>) => {
  const router = useRouter();
  const [checkedRows, setCheckedRows] = useState<boolean[]>(new Array(data.length).fill(false));
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const [showPopup, setShowPopup] = useState<"confirm" | null>(null);
  const [transIdToConfirm, setTransIdToConfirm] = useState<string | null>(null);
  const [dispIdToConfirm, setDispIdToConfirm] = useState<string | null>(null);

  


    const openConfirmTransactionPopup = (transaction_id: string, dispositive_id: string) => {
      setTransIdToConfirm(transaction_id);
      setDispIdToConfirm(dispositive_id);
      setShowPopup("confirm");
    };

    const closePopup = () => {
      setShowPopup(null);
      setTransIdToConfirm(null);
      setDispIdToConfirm(null);
    };

  const handleHeaderCheckboxChange = () => {
    const newCheckedState = !isHeaderChecked;
    setIsHeaderChecked(newCheckedState);
    setCheckedRows(new Array(data.length).fill(newCheckedState));
  };

  const handleRowCheckboxChange = (index: number) => {
    const newCheckedRows = [...checkedRows];
    newCheckedRows[index] = !newCheckedRows[index];
    setCheckedRows(newCheckedRows);

    const allChecked = newCheckedRows.every((checked) => checked);
    setIsHeaderChecked(allChecked);
  };

  const openDetails = (id: any) => {
    router.push(`/${page}/${id}`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* header  */}
      <div className="flex relative justify-between w-full px-5 py-2 bg-irchad-gray border-y border-irchad-gray-light">
        {columns.slice(1).map((column, index) => (
          <div key={index} className={`flex ${(page === "pois" || page === "zones") ? 'w-2/3' : 'w-1/5'} justify-start items-center space-x-3`}>
            {column.key === "name" ? (
              <>
                <Checkbox
                  checked={isHeaderChecked}
                  onChange={handleHeaderCheckboxChange}
                />
                <p className="text-irchad-gray-light text-[16px] font-product-sans">{column.label}</p>
              </>
            ) : (
              <p className="text-irchad-gray-light text-[16px] font-product-sans">{column.label}</p>
            )}
          </div>
        ))}
        <div className={`flex ${page === "pois" || page === "zones" ? 'w-1/3' : 'w-1/12'} justify-end items-center space-x-2`}>
            {/* <Trash2 className="text-irchad-gray-light"/> */}
            <div className="flex space-x-3">
              <Filter className="text-irchad-gray-light"/>
              <p className="text-irchad-gray-light text-[16px] font-roboto">Filter</p>
            </div>
          </div>
      </div>

      {/* content */}
      <div className="flex flex-col w-full">
        {data.map((item, index) => (
          <div key={index} className="flex relative justify-between w-full px-5 py-2 bg-irchad-gray-dark border-b border-irchad-gray-light">
            {columns.slice(1).map((column, colIndex) => (
              <div
              key={colIndex}
              className={`flex ${(page === "pois" || page === "zones") ? 'w-2/3' : 'w-1/5'} justify-start items-center`}
            >
              {column.key === "name" || column.key === "clientName" ? (
                <>
                  <Checkbox
                    checked={checkedRows[index]}
                    onChange={() => handleRowCheckboxChange(index)}
                  />
                  <p className="text-irchad-gray-light text-[16px] font-product-sans ml-1 truncate">
                    {page === "environments" && (item[column.key] == null) ? "" : String(item[column.key] || "")}
                  </p>
                </>
              ) : page === "transactions" && column.key === "status" ? (
                item[column.key] === false ? (
                  <button
                    className="px-3 py-1 bg-[#FF8B00] text-white rounded-md text-sm"
                    onClick={() => {
                      const itemTyped = item as { id: string; dispositifID: string };
                      openConfirmTransactionPopup(itemTyped.id, itemTyped.dispositifID);
                    }}

                  
                  >
                    Confirm
                  </button>
                ) : (
                  <p className="text-irchad-gray-light text-[16px] font-product-sans">Confirmed</p>
                )
              ) : (
                <p className="text-irchad-gray-light text-[16px] font-product-sans truncate">
                  {page === "environments" && (item[column.key] == null) ? "" : String(item[column.key] || "")}
                </p>
              )}
            </div>
            
            ))}
            <div className={`flex ${page === "pois" || page === "zones" ? 'w-1/3' : 'w-1/12'} justify-end items-center space-x-6`}>
              <Trash2 className="text-irchad-gray-light cursor-pointer w-5 h-5" onClick={() => onDelete(item)}/>
              {page === "devices" ? 
                <Ban className="text-irchad-gray-light cursor-pointer w-5 h-5" onClick={() => onEdit(item)}/>
                : 
                page === "environments" ? 
                <Download className="text-irchad-gray-light cursor-pointer w-5 h-5" onClick={() => onEdit(item)}/>
                :
                page !== "transactions" ?
                <Pen className="text-irchad-gray-light cursor-pointer w-5 h-5" onClick={() => onEdit(item)}/>
              : null
              }
              {page === "pois" ? 
                <Link className="text-irchad-gray-light cursor-pointer w-5 h-5" onClick={() => onEdit(item)}/> 
                : 
                page !== "zones" && page !== "transactions" &&
                <ArrowRight className="text-irchad-gray-light cursor-pointer w-5 h-5" onClick={() => openDetails(item[columns[0].key])}/>
              }
            </div>
          </div>
        ))}
      </div>
      {showPopup && (
        <PopUpScreen>
          {showPopup === "confirm" && transIdToConfirm && dispIdToConfirm && <ConfirmTransaction  transaction_id={transIdToConfirm} dispositive_id={dispIdToConfirm} closePopup={closePopup}/>}
        </PopUpScreen>
      )}
    </div>
  );
};

export default TableData;
