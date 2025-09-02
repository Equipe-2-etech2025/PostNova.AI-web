import React, { useState } from "react";
import {
	BsFullscreen,
	BsFullscreenExit,
	BsMagic,
	BsArrowRepeat,
} from "react-icons/bs";
import Button from "@shared/Button";
import SectionBlock from "@layouts/SectionBlock";
import ShareButton from "./componentsPosts/ShareButton";
import DeleteButton from "./componentsPosts/DeleteButton";
import MessageNotification from "@shared/MessageNotification";
import { useNotification } from "@hooks/useNotification";

const ImagePreview = ({
	previewActive = false,
	onTogglePreview = () => {},
	imageSrc,
	imageAlt,
	creationDate,
	promptText,
	imageId,
	onDeleteImage,
}) => {
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const { notification, hideNotification, showSuccess, showError } =
		useNotification();

	const handleDeleteClick = () => {
		setShowDeleteConfirm(true);
	};

	const handleConfirmDelete = async () => {
		if (onDeleteImage && imageId) {
			try {
				setIsDeleting(true);
				await onDeleteImage(imageId);
				showSuccess("Image supprimé avec succès", {
					duration: 5000,
					position: "top-center",
				});
				setShowDeleteConfirm(false);
			} catch (error) {
				showError(error.message || "Erreur lors de la suppression", {
					duration: 5000,
					position: "top-center",
				});
				console.error("Erreur lors de la suppression:", error);
			} finally {
				setIsDeleting(false);
			}
		}
	};

	const handleCancelDelete = () => {
		setShowDeleteConfirm(false);
	};

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
			<div
				className={`flex h-full gap-8 p-8 transition-all duration-300 ${showDeleteConfirm ? "blur-sm" : ""}`}
			>
				{/* Image */}
				<div className="flex-1 flex justify-center items-center overflow-auto">
					<div
						className={`relative ${previewActive ? "h-full" : "w-full"} rounded-2xl overflow-hidden mx-auto`}
					>
						<img
							src={imageSrc}
							alt={imageAlt}
							className="w-full h-auto max-h-full object-contain"
						/>
						<div className="absolute top-4 right-4">
							<Button
								variant="solid"
								size="none"
								color="tertiary"
								circle
								className="p-2"
								onClick={onTogglePreview}
							>
								{previewActive ? <BsFullscreenExit /> : <BsFullscreen />}
							</Button>
						</div>
					</div>
				</div>

				{/* Informations */}
				<div
					className={`${previewActive ? "flex-0" : "flex-1"} space-y-6 overflow-auto`}
				>
					<h1 className="text-center text-3xl font-bold mb-2">Détails de l'image</h1>

					<div className="space-y-4">
						<SectionBlock title="Informations" icon={<BsMagic />}>
							<div className="grid grid-cols-1 gap-4">
								<div>
									<p className="text-sm text-gray-500">Date de création</p>
									<p>{creationDate}</p>
								</div>
							</div>
						</SectionBlock>

						<SectionBlock title="Prompt" icon={<BsMagic />}>
							<p>{promptText}</p>
						</SectionBlock>

						<div className="text-end space-x-2 relative mt-3">
							<ShareButton />
							{imageId && onDeleteImage && (
								<DeleteButton onClick={handleDeleteClick} />
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Modal de confirmation avec arrière-plan flou */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4 shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
						<h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-6">
							Êtes-vous sûr de vouloir supprimer cette image ? Cette action est
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

export default ImagePreview;
