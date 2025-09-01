import React, { Suspense, useState } from "react";
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
	posts,
	campaignName,
	campaignDescription,
	onCampaignUpdateSuccess,
	onContentRefresh,
	campaignId,
}) => {
	const [newRequestModalSize, setNewRequestModalSize] = useState("xl");

	const handleSuccess = () => {
		if (onContentRefresh) {
			onContentRefresh();
		}
	};

	const handleContentGenerated = (size = "5xl") => {
		setNewRequestModalSize(size);
	};

	const handleNewRequestClose = () => {
		setNewRequestModalSize("xl");
		closeModal();
	};

	const handleCloseAndRefresh = () => {
		handleSuccess();
		closeModal();
	};

	return (
		<>
			{/* Modal Share Confirmation */}
			<Modal isOpen={isOpen("share-confirmation")} onClose={closeModal} size="sm">
				<div className="p-6 space-y-4">
					<h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
						Voulez-vous vraiment partager vos campagnes aux réseaux Nova ?
					</h2>
					<div className="flex justify-end gap-3">
						<button
							className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg"
							onClick={closeModal}
						>
							Non
						</button>
						<button
							className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
							onClick={() => {
								console.log("Appel API de partage (à implémenter)");
								closeModal();
							}}
						>
							Oui
						</button>
					</div>
				</div>
			</Modal>

			{/* Modal Edit Campaign */}
			<Modal isOpen={isOpen("edit-campaign")} onClose={closeModal} size="xl">
				<Suspense fallback={<div>Chargement...</div>}>
					<EditCampaign
						campaignName={campaignName}
						campaignDescription={campaignDescription}
						onSuccess={() => {
							onCampaignUpdateSuccess();
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
						campaignId={campaignId}
						onSuccess={handleCloseAndRefresh}
						onContentGenerated={handleContentGenerated}
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
					/>
				)}
			</Modal>

			<Modal isOpen={isOpen("image-marketing")} onClose={closeModal} size="xl">
				<Suspense fallback={<div>Chargement...</div>}>
					<Feature.ImageMarketing
						campaignId={campaignId}
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
						previewActive={isPreview}
						onTogglePreview={() => setIsPreview((prev) => !prev)}
						onSuccess={handleCloseAndRefresh}
					/>
				</Suspense>
			</Modal>
		</>
	);
};

export default CampaignModals;
