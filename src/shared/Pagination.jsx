import React from "react";
import PropTypes from "prop-types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages === 0) return null;

  const renderPageButton = (page) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
        page === currentPage
          ? "bg-[#4335C4] text-white border-[#4335C4] shadow-md"
          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-[#f0f0ff] dark:hover:bg-gray-700"
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
      {/* Précédent */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f0f0ff] dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      >
        <BsChevronLeft size={18} className="text-[#4335C4] dark:text-white" />
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(renderPageButton)}

      {/* Suivant */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f0f0ff] dark:hover:bg-gray-700 transition-colors flex items-center justify-center"
      >
        <BsChevronRight size={18} className="text-[#4335C4] dark:text-white" />
      </button>
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
