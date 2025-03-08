import React from "react";
import {ArrowLeft, ArrowRight} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageSelect: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNext,
  onPrevious,
  onPageSelect,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= maxVisible + 1) {
        for (let i = 1; i <= maxVisible + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1, totalPages);
      } else if (currentPage > totalPages - maxVisible) {
        pages.push(1, 2, "...");
        for (let i = totalPages - maxVisible; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1, 2, "...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages - 1, totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex relative justify-center items-center w-full px-5 py-4 bg-irchad-gray-dark">
      {/* Previous Button */}
      <div className="flex w-1/3 justify-start items-center">
        <button
          className="flex space-x-3 justify-center items-center bg-irchad-gray-dark px-4 py-2 rounded-lg border-[0.5px] border-irchad-gray-light"
          onClick={onPrevious}
          disabled={currentPage === 1}
        >
          <ArrowLeft className="text-irchad-gray-light"/>
          <p className="font-roboto font-semibold text-[16px] text-irchad-gray-light">
            Previous
          </p>
        </button>
      </div>

      {/* Page Numbers */}
      <div className="flex w-1/3 justify-center items-center space-x-3">
        {generatePageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageSelect(page)}
              className={`px-3 py-1 rounded-lg font-roboto font-semibold ${
                page === currentPage ? "bg-irchad-gray text-irchad-orange" : "bg-irchad-gray-dark text-irchad-gray-light"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-irchad-gray-light">
              {page}
            </span>
          )
        )}
      </div>

      {/* Next Button */}
      <div className="flex w-1/3 justify-end items-center">
        <button
          className="flex space-x-3 bg-irchad-gray-dark justify-center items-center px-4 py-2 rounded-lg border-[0.5px] border-irchad-gray-light"
          onClick={onNext}
          disabled={currentPage === totalPages}
        >
          <p className="font-roboto font-semibold text-[16px] text-irchad-gray-light">
            Next
          </p>
          <ArrowRight className="text-irchad-gray-light"/>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
