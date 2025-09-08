import React from "react";
import { BsSave } from "react-icons/bs";
import Button from "@shared/Button";

const SaveButton = ({ onClick }) => {
	return (
		<div className="relative inline-flex items-center">
			<Button
				variant="outline"
				color="primary"
				className="flex items-center color:danger gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
				onClick={onClick}
			>
				<span className="text-sm">Enregistrer</span>
				<BsSave />
			</Button>
		</div>
	);
};

export default SaveButton;