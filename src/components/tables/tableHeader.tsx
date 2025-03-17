import React, { useState } from "react";
import { ChevronDown, Search} from "lucide-react";

interface HeaderSectionProps {
  type: string;
  itemCount: number;
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  openAddPopup: () => void;
  sortingOptions: string[];
  selectedSort: string;
  onSortChange: (sortOption: string) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  type,
  itemCount,
  searchValue,
  onSearchChange,
  openAddPopup,
  sortingOptions,
  selectedSort,
  onSortChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex relative justify-start items-center w-full py-6 px-5 space-x-16">
      {/* Type and Item Count */}
      <div className="flex space-x-5 items-center">
        <p className="font-roboto-medium text-[16px] capitalize">
          {`${type}s`}
        </p>
        <div className="bg-[#2E2E2E] border border-[#FF8B00] px-4 py-1 rounded-2xl">
          <p className="text-[#FF8B00] text-[16px] font-roboto">
            {itemCount} {type}
          </p>
        </div>
      </div>

      {/* Sorting Section */}
      <div
        className="relative flex bg-[#1E1E1E] border border-[#959595] px-5 py-2 rounded-lg space-x-3 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="text-[#F7F8FA] text-[16px] font-roboto">
          Sort by: {selectedSort}
        </p>

        <ChevronDown className="text-irchad-gray-light"/>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div className="absolute top-10 left-0 w-full bg-[#2E2E2E] rounded-lg shadow-lg z-10">
            {sortingOptions.map((option) => (
              <div
                key={option}
                className="px-4 py-2 hover:bg-[#959595] hover:text-[#2E2E2E] cursor-pointer"
                onClick={() => {
                  onSortChange(option);
                  setIsDropdownOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search Section */}
      <div className="flex relative justify-start w-1/3 items-center bg-[#2E2E2E] px-4 py-2 rounded-lg">
        <div className="flex mx-3 rounded-full w-[30px] h-[30px]">
          <div className="flex w-full h-full justify-center items-center">
            <Search className="text-irchad-gray-light"/>
          </div>
        </div>
        <input
          type="text"
          value={searchValue}
          className="text-[#959595] bg-transparent text-[16px] font-roboto focus:outline-none"
          onChange={onSearchChange}
          placeholder={type === "decision maker" ? `Search` : `Search for ${type}`}
        />
      </div>

      {/* Add New Item */}
      <div
        className="absolute right-5 bg-[#FF8B00] px-4 py-2 rounded-lg cursor-pointer"
        onClick={openAddPopup}
      >
        {type === "decision maker" ? (
          <p className="text-[16px] font-roboto text-[#1E1E1E]">+ Add</p>
        ) : (
          <p className="text-[16px] font-roboto text-[#1E1E1E]">+ Add {type}</p>
        )}
      </div>
    </div>
  );
};

export default HeaderSection;
