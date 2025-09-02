import React from "react";
import { BsTrash } from "react-icons/bs";
import Button from "@shared/Button";

const DeleteButton = ({ onClick }) => {
	return (
		<div className="relative inline-flex items-center">
			<Button
				variant="outline"
				color="danger"
				className="flex items-center color:danger gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
				onClick={onClick}
			>
				<span className="text-sm">Supprimer</span>
				<BsTrash />
			</Button>
		</div>
	);
};

export default DeleteButton;
