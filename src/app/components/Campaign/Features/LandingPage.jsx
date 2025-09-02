import React, { useEffect, useState } from "react";
import { BsCheck, BsCopy, BsArrowRepeat } from "react-icons/bs";
import { useNotification } from "@hooks/useNotification";
import { handleCopyToClipboard } from "@shared/copyToClipboard";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import { processTemplate } from "@shared/templateUtils";
import { deleteLandingPage } from "@services/landingPageService";

const LandingPage = ({ data, onDelete }) => {
	const { notification, hideNotification, showSuccess, showError } =
		useNotification();

	const [isCopied, setIsCopied] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const iframeRef = React.useRef(null);

	const handleCancelDelete = () => {
		setShowDeleteConfirm(false);
	};

	const handleConfirmDelete = async () => {
		setIsDeleting(true);
		try {
			await deleteLandingPage(data.id);
			showSuccess("Landing page supprimée avec succès");
			onDelete(data.id);
		} catch (err) {
			console.log(err.message);
			showError("Erreur lors de la suppression de la landing page");
		} finally {
			setIsDeleting(false);
		}
	};

	useEffect(() => {
		if (iframeRef.current && data) {
			iframeRef.current.srcdoc = processTemplate(
				data.content.template.html,
				data.content.template.data
			);
		}
	}, [data]);

	return (
		<>
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={hideNotification}
				autoHide
				duration={5000}
				position="top-center"
				showProgressBar
			/>

			<div className="flex flex-col h-full">
				<div className="text-center">
					<h3 className="text-3xl font-bold mb-2">Landing Page</h3>
				</div>

				<div className="h-full bg-green-50">
					<iframe ref={iframeRef} className="size-full rounded-2xl" />
				</div>

				<div className="text-end space-x-2 relative mt-3">
					<div className="inline-flex items-center gap-2">
						<Button
							variant="outline"
							className={`flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
								isCopied
									? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
									: ""
							}`}
							onClick={() =>
								handleCopyToClipboard(
									iframeRef.current.contentWindow.document.body.innerHTML,
									setIsCopied,
									showSuccess,
									showError
								)
							}
						>
							{isCopied ? (
								<>
									<span>Copié !</span>
									<BsCheck className="text-white" />
								</>
							) : (
								<>
									<span>Copier</span>
									<BsCopy />
								</>
							)}
						</Button>
						{/* Supprimer */}
						<Button
							variant="outline"
							color="danger"
							className="flex items-center gap-2"
							onClick={() => setShowDeleteConfirm(true)}
						>
							<span>Supprimer</span>
						</Button>
					</div>
				</div>
			</div>

			{/* Modal de confirmation avec arrière-plan flou */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
                        <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Êtes-vous sûr de vouloir supprimer cette page ? Cette action est
                            irréversible.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <Button
                                variant="outline"
                                onClick={handleCancelDelete}
                                disabled={isDeleting}
                            >
                                Annuler
                            </Button>
                            <Button
                                variant="solid"
                                color="danger"
                                onClick={handleConfirmDelete}
                                disabled={isDeleting}
                                className={`flex items-center gap-2 ${isDeleting ? "opacity-70 cursor-not-allowed" : ""}`}
                            >
                                {isDeleting ? (
                                    <>
                                        <BsArrowRepeat className="animate-spin" size={16} />
                                        Suppression...
                                    </>
                                ) : (
                                    "Supprimer"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
		</>
	);
};

export default LandingPage;
