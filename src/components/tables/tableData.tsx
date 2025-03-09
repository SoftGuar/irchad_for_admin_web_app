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
      <div className="flex relative justify-between  w-full px-5 py-2 bg-irchad-gray border-y border-irchad-gray-light">
        {columns.slice(1).map((column, index) => (
          <div key={index} className={`flex w-1/5 justify-start items-center space-x-3`}>
            {column.key === "name" ? (
              <>
                <input type="checkbox" className="w-[20px] h-[20px] rounded-md bg-irchad-gray border-[0.5px] border-irchad-gray-light cursor-pointer"/>
                <p className="text-irchad-gray-light text-[16px] font-product-sans">{column.label}</p>
              </>
            ) : (
              <p className="text-irchad-gray-light text-[16px] font-product-sans">{column.label}</p>
            )}
          </div>
        ))}
        <div className="flex w-1/12 justify-end items-center space-x-3">
            <Trash2 className="text-irchad-gray-light"/>
            <div className="flex space-x-3">
              <Filter className="text-irchad-gray-light"/>
              <p className="text-irchad-gray-light text-[16px] font-roboto">Filter</p>
            </div>
          </div>
      </div>

      <div className="flex flex-col w-full">
        {data.map((item, index) => (

          <div key={index} className="flex relative justify-center items-center w-full px-5 py-4 bg-irchad-gray-dark border-b border-irchad-gray-light">
            {columns.slice(1).map((column, colIndex) => (
              <div key={colIndex} className={`flex w-1/5 justify-start items-center`}>
                {column.key === "name" ? (
                  <>
                    <input type="checkbox" className="w-[20px] h-[20px] mr-2 rounded-md bg-irchad-gray border-[0.5px] border-irchad-gray-light cursor-pointer"/>
                    <p className="text-irchad-gray-light text-[16px] font-product-sans">{String(item[column.key])}</p>
                    </>
                ) : (
                  <p className="text-irchad-gray-light text-[16px] font-product-sans">{String(item[column.key])}</p>
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
