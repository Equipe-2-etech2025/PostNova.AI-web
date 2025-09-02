export const handleCopyToClipboard = async (
	text,
	setIsCopied,
	showSuccess,
	showError
) => {
	try {
		await navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
		showSuccess("Contenu copié !", { duration: 2000, position: "top-center" });
	} catch (err) {
		console.error("Erreur lors de la copie :", err.message);
		showError("Échec de la copie", { duration: 3000, position: "top-center" });
	}
};
