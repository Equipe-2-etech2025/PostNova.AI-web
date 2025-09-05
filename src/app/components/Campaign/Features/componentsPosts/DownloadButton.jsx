import React from "react";
import { BsDownload } from "react-icons/bs";
import Button from "@shared/Button";

const DownloadButton = ({onClick}) => {
	return (
		<div className="relative inline-flex items-center">
			<Button
				variant="outline"
				color="secondary"
				className="flex items-center color:danger gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
				onClick={onClick}
			>
                <span className="text-sm">Télécharger</span>
				<BsDownload />
			</Button>
		</div>
	);
};

export default DownloadButton;
