import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Button from "@shared/Button";

const CampaignsPagination = ({
	currentPage,
	totalPages,
	setCurrentPage,
}) => {
	if (totalPages <= 1) return null;

	return (
		<div className="mt-8 flex justify-center">
			<div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md border border-gray-200 dark:border-gray-700">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
					className="rounded-full w-10 h-10 p-0 dark:text-gray-300 dark:hover:bg-gray-700"
				>
					<FiChevronLeft size={16} />
				</Button>

				{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
					let pageNum;
					if (totalPages <= 5) {
						pageNum = i + 1;
					} else if (currentPage <= 3) {
						pageNum = i + 1;
					} else if (currentPage >= totalPages - 2) {
						pageNum = totalPages - 4 + i;
					} else {
						pageNum = currentPage - 2 + i;
					}

					const isActive = currentPage === pageNum;

					return (
						<Button
							key={pageNum}
							variant={isActive ? "primary" : "ghost"}
							size="sm"
							onClick={() => setCurrentPage(pageNum)}
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

				<Button
					variant="ghost"
					size="sm"
					onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
					className="rounded-full w-10 h-10 p-0 dark:text-gray-300 dark:hover:bg-gray-700"
				>
					<FiChevronRight size={16} />
				</Button>
			</div>
		</div>
	);
};

export default CampaignsPagination;