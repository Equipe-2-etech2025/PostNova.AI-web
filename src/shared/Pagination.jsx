import React from "react";
import PropTypes from "prop-types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "@shared/Button";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5];
    }
    if (currentPage >= totalPages - 2) {
      return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md border border-gray-200 dark:border-gray-700">
        
        {/* Précédent */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="rounded-full w-10 h-10 p-0 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <FiChevronLeft size={16} />
        </Button>

        {/* Pages */}
        {getVisiblePages().map((pageNum) => {
          const isActive = currentPage === pageNum;
          return (
            <Button
              key={pageNum}
              variant={isActive ? "primary" : "ghost"}
              size="sm"
              onClick={() => onPageChange(pageNum)}
              className={`rounded-full w-10 h-10 p-0 text-sm font-medium ${
                isActive
                  ? "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </Button>
          );
        })}

        {/* Suivant */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="rounded-full w-10 h-10 p-0 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <FiChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
