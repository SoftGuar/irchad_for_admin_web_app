import { useRouter } from "next/navigation";
import {Trash2, Filter, Pen, ArrowRight} from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface TableDataProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  page: string;
}

const TableData = <T,>({ columns, data, onEdit, onDelete, page }: TableDataProps<T>) => {
  const router = useRouter();

  const openDetails = (id: any) => {
    router.push(`/${page}/${id}`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex relative justify-between  w-full px-5 py-2 bg-[#2E2E2E] border-y border-[#959595]">
        {columns.slice(1).map((column, index) => (
          <div key={index} className={`flex w-1/5 justify-start items-center space-x-3`}>
            {column.key === "name" ? (
              <>
                <input type="checkbox" className="w-[20px] h-[20px] rounded-md bg-[#2E2E2E] border-[0.5px] border-[#959595] cursor-pointer"/>
                <p className="text-[#959595] text-[16px] font-product-sans">{column.label}</p>
              </>
            ) : (
              <p className="text-[#959595] text-[16px] font-product-sans">{column.label}</p>
            )}
          </div>
        ))}
        <div className="flex w-1/12 justify-end items-center space-x-3">
            <Trash2 className="text-irchad-gray-light"/>
            <div className="cursor-pointer flex space-x-3">
              <Filter className="text-irchad-gray-light"/>
              <p className="text-[#959595] text-[16px] font-roboto">Filter</p>
            </div>
          </div>
      </div>

      <div className="flex flex-col w-full">
        {data.map((item, index) => (

          <div key={index} className="flex relative justify-center items-center w-full px-5 py-4 bg-[#1E1E1E] border-b border-[#959595]">
            {columns.slice(1).map((column, colIndex) => (
              <div key={colIndex} className={`flex w-1/5 justify-start items-center`}>
                {column.key === "name" ? (
                  <>
                    <input type="checkbox" className="w-[20px] h-[20px] mr-2 rounded-md bg-[#2E2E2E] border-[0.5px] border-[#959595] cursor-pointer"/>
                    <p className="text-[#959595] text-[16px] font-product-sans">{String(item[column.key])}</p>
                    </>
                ) : (
                  <p className="text-[#959595] text-[16px] font-product-sans">{String(item[column.key])}</p>
                )}
              </div>
            ))}
            <div className="flex w-1/12 justify-end items-center space-x-6">
              <Trash2 className="text-irchad-gray-light cursor-pointer" onClick={() => onDelete(item)}/>
              <Pen className="text-irchad-gray-light cursor-pointer" onClick={() => onEdit(item)}/>
              <ArrowRight className="text-irchad-gray-light cursor-pointer" onClick={() => openDetails(item[columns[0].key])}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableData;
