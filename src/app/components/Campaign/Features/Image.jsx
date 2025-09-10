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
				className={`flex flex-col lg:flex-row h-full gap-4 lg:gap-8 p-4 lg:p-8 transition-all duration-300 ${showDeleteConfirm ? "blur-sm" : ""}`}
			>
				{/* Image */}
				<div className="flex-1 flex justify-center items-center overflow-auto min-h-[300px] lg:min-h-0">
					<div
						className={`relative ${
							previewActive ? "h-full w-full" : "w-full max-w-full lg:max-w-none"
						} rounded-lg lg:rounded-2xl overflow-hidden mx-auto`}
					>
						<img
							src={imageSrc}
							alt={imageAlt}
							className="w-full h-auto max-h-full object-contain"
						/>
						<div className="absolute top-2 right-2 lg:top-4 lg:right-4">
							<Button
								variant="solid"
								size="none"
								color="tertiary"
								circle
								className="p-1.5 lg:p-2"
								onClick={onTogglePreview}
							>
								{previewActive ? <BsFullscreenExit /> : <BsFullscreen />}
							</Button>
						</div>
					</div>
				</div>

				{/* Informations */}
				<div
					className={`${
						previewActive
							? "hidden lg:flex lg:flex-col lg:flex-0"
							: "flex flex-col flex-1"
					} space-y-4 lg:space-y-6 overflow-auto`}
				>
					<h1 className="text-center text-xl lg:text-3xl font-bold mb-2">
						Détails de l'image
					</h1>

					<div className="space-y-3 lg:space-y-4">
						<SectionBlock title="Informations" icon={<BsMagic />}>
							<div className="grid grid-cols-1 gap-3 lg:gap-4">
								<div>
									<p className="text-xs lg:text-sm text-gray-500">Date de création</p>
									<p className="text-sm lg:text-base">{creationDate}</p>
								</div>
							</div>
						</SectionBlock>

						<SectionBlock title="Prompt" icon={<BsMagic />}>
							<p className="text-sm lg:text-base leading-relaxed">{promptText}</p>
						</SectionBlock>

						<div className="flex flex-row justify-center lg:justify-end space-x-2 relative mt-3">
							{imageId && onDeleteImage && (
								<DeleteButton onClick={handleDeleteClick} />
							)}
							<ShareButton />
						</div>
					</div>
				</div>
			</div>

			{/* Modal de confirmation avec arrière-plan flou */}
			{showDeleteConfirm && (
				<div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-50 p-4">
					<div className="bg-white dark:bg-gray-800 p-4 lg:p-6 rounded-lg max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in-0 zoom-in-95">
						<h3 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4">
							Confirmer la suppression
						</h3>
						<p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 leading-relaxed">
							Êtes-vous sûr de vouloir supprimer cette image ? Cette action est
							irréversible.
						</p>
						<div className="flex flex-col-reverse sm:flex-row gap-2 lg:gap-3 sm:justify-end">
							<Button
								variant="outline"
								onClick={handleCancelDelete}
								disabled={isDeleting}
								className="w-full sm:w-auto"
							>
								Annuler
							</Button>
							<Button
								variant="solid"
								color="danger"
								onClick={handleConfirmDelete}
								disabled={isDeleting}
								className={`w-full sm:w-auto flex items-center justify-center gap-2 ${
									isDeleting ? "opacity-70 cursor-not-allowed" : ""
								}`}
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
