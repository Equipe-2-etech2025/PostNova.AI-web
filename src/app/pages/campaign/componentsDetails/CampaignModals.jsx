import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router";
import { BsArrowRepeat } from "react-icons/bs";
import Modal from "@shared/Modal";
import EditCampaign from "@layouts/Campaign/EditCampaign";
import NewRequest from "@layouts/Campaign/NewRequest";
import ImagePreview from "@components/Campaign/Features/Image";
import * as Feature from "@components/Campaign/Features";

const CampaignModals = ({
	isOpen,
	closeModal,
	isPreview,
	setIsPreview,
	selectedImage,
	selectedPostId,
	selectedLandingPage,
	posts,
	campaign,
	onCampaignUpdateSuccess,
	onContentRefresh,
	isShareModalOpen,
	onCloseShareModal,
	onShareCampaign,
	onDeletePost,
	deleteConfirmOpen,
	setDeleteConfirmOpen,
	setSelectedPostId,
	setSelectedLandingPage,
	onDeleteImage,
}) => {
	const navigate = useNavigate();
	const [newRequestModalSize, setNewRequestModalSize] = useState("3xl");
	const [isSharing, setIsSharing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleContentGenerated = (size = "5xl") => {
		setNewRequestModalSize(size);
	};

	const handleNewRequestClose = () => {
		setNewRequestModalSize("xl");
		closeModal();
	};

	const handleCloseAndRefresh = () => {
		if (onContentRefresh) {
			onContentRefresh();
		}
	};

	const handleShare = async () => {
		try {
			setIsSharing(true);
			await onShareCampaign();
		} finally {
			setIsSharing(false);
		}
	};

	const handleDeletePost = async () => {
		try {
			setIsDeleting(true);
			await onDeletePost(selectedPostId);
			setDeleteConfirmOpen(false);
		} finally {
			setIsDeleting(false);
		}
	};

	// Nouvelle fonction pour gérer la suppression d'images
	const handleDeleteImage = async (imageId) => {
		try {
			await onDeleteImage(imageId);
			// Fermer la modal et actualiser le contenu après suppression
			closeModal();
			if (onContentRefresh) {
				onContentRefresh();
			}
		} catch (error) {
			console.error("Erreur lors de la suppression de l'image:", error);
			// Vous pouvez ajouter une notification d'erreur ici
		}
	};

	return (
		<>
			{/* Modal Delete post confirmation */}
			<Modal
				isOpen={deleteConfirmOpen}
				onClose={() => setDeleteConfirmOpen(false)}
				size="sm"
			>
				<div className="p-6 space-y-4">
					<h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
						Voulez-vous vraiment supprimer ce post ? Cette action est irréversible.
					</h2>
					<div className="flex justify-end gap-3">
						<button
							className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg"
							onClick={() => setDeleteConfirmOpen(false)}
							disabled={isDeleting}
						>
							Non
						</button>
						<button
							className={`flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg ${
								isDeleting ? "opacity-70 cursor-not-allowed" : ""
							}`}
							onClick={handleDeletePost}
							disabled={isDeleting}
						>
							{isDeleting ? (
								<>
									<BsArrowRepeat className="animate-spin" size={16} />
									Suppression en cours...
								</>
							) : (
								"Oui"
							)}
						</button>
					</div>
				</div>
			</Modal>

			{/* Modal Share Confirmation */}
			<Modal isOpen={isShareModalOpen} onClose={onCloseShareModal} size="sm">
				<div className="p-6 space-y-4">
					<h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
						Voulez-vous vraiment partager vos campagnes aux réseaux Nova ?
					</h2>
					<div className="flex justify-end gap-3">
						<button
							className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg"
							onClick={onCloseShareModal}
							disabled={isSharing}
						>
							Non
						</button>
						<button
							className={`flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg ${
								isSharing ? "opacity-70 cursor-not-allowed" : ""
							}`}
							onClick={handleShare}
							disabled={isSharing}
						>
							{isSharing ? (
								<>
									<BsArrowRepeat className="h-4 w-4 animate-spin" />
									Partage en cours...
								</>
							) : (
								"Oui"
							)}
						</button>
					</div>
				</div>
			</Modal>

			{/* Modal Edit Campaign */}
			<Modal isOpen={isOpen("edit-campaign")} onClose={closeModal} size="xl">
				<Suspense fallback={<div>Chargement...</div>}>
					<EditCampaign
						campaignName={campaign.name}
						campaignDescription={campaign.description}
						onSuccess={() => {
							onContentRefresh();
							closeModal();
						}}
						onCancel={closeModal}
					/>
				</Suspense>
			</Modal>

			{/* Modal New Request - avec taille dynamique */}
			<Modal
				isOpen={isOpen("new-request")}
				onClose={handleNewRequestClose}
				size={newRequestModalSize}
				className={newRequestModalSize === "full" ? "!p-0" : ""}
			>
				<Suspense fallback={<div>Chargement...</div>}>
					<NewRequest
						campaignId={campaign.id}
						modalSize={newRequestModalSize}
						onSuccess={handleCloseAndRefresh}
						onContentGenerated={handleContentGenerated}
						onContentRefresh={onContentRefresh}
					/>
				</Suspense>
			</Modal>

			{/* Modal Post */}
			<Modal isOpen={isOpen("post")} onClose={closeModal} size="full">
				<Suspense fallback={<div>Chargement...</div>}>
					{posts.length > 0 && (
						<Feature.Post
							postData={posts.find((post) => post.id === selectedPostId)}
							onSuccess={handleCloseAndRefresh}
							setSelectedPostId={setSelectedPostId}
							setDeleteConfirmOpen={setDeleteConfirmOpen}
						/>
					)}
				</Suspense>
			</Modal>

			{/* Modal Image */}
			<Modal
				isOpen={isOpen("image")}
				onClose={() => {
					closeModal();
					setIsPreview(false);
				}}
				size={isPreview ? "full" : "xl"}
			>
				{selectedImage && (
					<ImagePreview
						previewActive={isPreview}
						onTogglePreview={() => setIsPreview(!isPreview)}
						imageSrc={selectedImage.path}
						imageAlt={`Image ${selectedImage.id}`}
						creationDate={new Date(selectedImage.created_at).toLocaleDateString()}
						status={selectedImage.is_published ? "Publiée" : "Non publiée"}
						onSuccess={handleCloseAndRefresh}
						promptText={selectedImage.prompt}
						imageId={selectedImage.id}
						onDeleteImage={handleDeleteImage}
					/>
				)}
			</Modal>

			<Modal
				isOpen={isOpen("image-marketing")}
				onClose={closeModal}
				size={newRequestModalSize}
				className={newRequestModalSize === "full" ? "!p-0" : ""}
			>
				<Suspense fallback={<div>Chargement...</div>}>
					<Feature.ImageMarketing
						campaignId={campaign.id}
						modalSize={newRequestModalSize}
						onSuccess={handleCloseAndRefresh}
						onContentGenerated={handleContentGenerated}
					/>
				</Suspense>
			</Modal>

			{/* Modal Landing Page */}
			<Modal
				isOpen={isOpen("landing-page")}
				onClose={() => {
					closeModal();
					setIsPreview(false);
				}}
				size={isPreview ? "full" : "fit"}
			>
				<Suspense fallback={<div>Chargement...</div>}>
					<Feature.LandingPage
						landingPageId={selectedLandingPage}
						previewActive={isPreview}
						onTogglePreview={() => setIsPreview((prev) => !prev)}
						onLandingPageDeleted={() => {
							onContentRefresh();
							setIsPreview(false);
							closeModal();
						}}
					/>
				</Suspense>
			</Modal>

			<Modal
				isOpen={isOpen("new-landing-page")}
				onClose={closeModal}
				size={newRequestModalSize}
				className={newRequestModalSize === "full" ? "p-0" : ""}
			>
				<Suspense fallback={<div>Chargement...</div>}>
					<Feature.NewLandingPage
						campaign={campaign}
						modalSize={newRequestModalSize}
						onSuccess={() => {
							closeModal();
							onContentRefresh()
							navigate("/campaign/" + campaign.id + "#landing-page");
						}}
					/>
				</Suspense>
			</Modal>
		</>
	);
};

export default CampaignModals;
