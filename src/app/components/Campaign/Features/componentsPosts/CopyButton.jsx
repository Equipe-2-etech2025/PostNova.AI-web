import React, { useState } from "react";
import { BsCopy, BsCheck } from "react-icons/bs";
import Button from "@shared/Button";
import { useNotification } from "@hooks/useNotification";

const CopyButton = ({ contentRef }) => {
	const [isCopied, setIsCopied] = useState(false);
	const { showSuccess, showError } = useNotification();

	const handleCopyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(contentRef.current.innerText);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
			showSuccess("Contenu copié !", { duration: 2000, position: "top-center" });
		} catch (err) {
			console.error("Erreur lors de la copie :", err.message);
			showError("Échec de la copie", { duration: 3000, position: "top-center" });
		}
	};

	return (
		<div className="relative inline-flex items-center">
			{isCopied && (
				<span className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm text-green-500 font-medium animate-fade-in">
					✓ Copié
				</span>
			)}
			
			<Button
				variant="outline"
				className="flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
				onClick={handleCopyToClipboard}
			>
				<span className="text-sm">Copier</span>
				<BsCopy />
			</Button>
		</div>
	);
};

export default CopyButton;