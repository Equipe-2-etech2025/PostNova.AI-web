import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useModal from "@hooks/useModal";
import useAuth from "@hooks/useAuth";
import { tarifUserService } from "@services/tarifUserService";
import { promptService } from "@services/promptService";

import { imageService } from "@services/imageService";
import { socialPostService } from "@services/socialPostService";
import { campaignInteractionService } from "@services/campaignInteractionService";
import { campaignService } from "@services/campaignService";
import { landingPageService } from "@services/landingPageService";

import CampaignHeader from "./componentsDetails/CampaignHeader";
import CampaignTabs from "./componentsDetails/CampaignTabs";
import CampaignContent from "./componentsDetails/CampaignContent";
import CampaignModals from "./componentsDetails/CampaignModals";
import CampaignChoiceSection from "./componentsDetails/CampaignChoiceSection";
import CampaignSidebar from "./componentsDetails/CampaignSidebar";

const Detail = () => {
	{
		/** Initialisations des hooks et des états **/
	}
	const location = useLocation();
	const { isOpen, openModal, closeModal } = useModal();
	const { user, loading: authLoading } = useAuth();
	const [isPreview, setIsPreview] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedPostId, setSelectedPostId] = useState(null);
	const [selectedLandingPage, setSelectedLandingPage] = useState(null);
	const [activeTab, setActiveTab] = useState(0);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const campaignId = location.pathname.split("/").pop();
	const [isShareModalOpen, setIsShareModalOpen] = useState(false);
	const [campaignInfo, setCampaignInfo] = useState({
		name: "",
		description: "",
		status: "",
		originalStatus: "",
		statusValue: "",
		loading: true,
	});
	const [campaignData, setCampaignData] = useState({
		images: [],
		posts: [],
		landingPages: [
			{
				id: 1,
				created_at: "2023-10-01T12:00:00Z",
				title: "Landing page 1",
				content: "",
			},
		],
		interactionStats: null,
	});
	const [quotaPrompt, setQuotaPrompt] = useState(null);
	const [tarif, setTarif] = useState(null);
	const [loadingQuota, setLoadingQuota] = useState(false);
	const [loading, setLoading] = useState({
		stats: true,
		images: true,
		posts: true,
		landingPages: true,
		all: true,
	});
	const [deletedPost, setDeletePost] = useState(false);
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

	{
		/** Fonctions **/
	}

	{
		/** supprimer la post en utilisant la serviceSocialPost delete */
	}
	const handleDeletePost = async (postId) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const response = await socialPostService.deleteSocialPost(postId);
			if (response.success) {
				const updatedPosts = campaignData.posts.filter(
					(post) => post.id !== postId
				);
				setCampaignData((prev) => ({ ...prev, posts: updatedPosts }));
				closeModal();
			} else {
				console.error("Erreur lors de la suppression du post:", response.message);
			}
		} catch (error) {
			console.error("Erreur API:", error);
		}
	};

	{
		/** supprimer l'image en utilisant le service imageService delete */
	}
	const handleDeleteImage = async (imageId) => {
		try {
			const response = await imageService.deleteImage(imageId);
			if (response.success) {
				// Mettre à jour la liste des images localement
				const updatedImages = campaignData.images.filter(
					(image) => image.id !== imageId
				);
				setCampaignData((prev) => ({ ...prev, images: updatedImages }));
				console.log("Image supprimée avec succès:", response.message);
			} else {
				console.error(
					"Erreur lors de la suppression de l'image:",
					response.message
				);
				// Optionnel: afficher une notification d'erreur à l'utilisateur
			}
		} catch (error) {
			console.error("Erreur API suppression image:", error);
			// Optionnel: afficher une notification d'erreur à l'utilisateur
		}
	};

	{
		/** Partager la campagne **/
	}
	const handleShareCampaign = async () => {
		try {
			const response = await campaignService.updateCampaign(campaignId, {
				is_published: true,
			});
			if (response.success) {
				setRefreshTrigger((prev) => prev + 1);
				setIsShareModalOpen(false);
			} else {
				console.error("Erreur lors de la publication:", response.message);
			}
		} catch (error) {
			console.error("Erreur API:", error);
		}
	};

	{
		/** Récupérer le quota de l'utilisateur **/
	}
	const fetchQuotaData = async (userId) => {
		if (!userId) {
			console.warn("Aucun userId pour récupérer le quota");
			return;
		}
		setLoadingQuota(true);
		try {
			const [tarifResult, quotaResult] = await Promise.all([
				tarifUserService.getLatestByUserId(userId),
				promptService.getQuotaByUserId(userId),
			]);

			if (tarifResult.success && tarifResult.data) {
				setTarif(tarifResult.data.data.tarif.max_limit);
			}

			if (quotaResult.success && quotaResult.data !== null) {
				setQuotaPrompt(quotaResult.data.data.daily_quota_used);
			}
		} catch (error) {
			console.error("Erreur quota:", error);
		} finally {
			setLoadingQuota(false);
		}
	};

	{
		/** Récupérer les détails de la campagne **/
	}
	const translateStatus = (englishStatus) => {
		const statusTranslations = {
			created: "Créée",
			processing: "En traitement",
			pending: "En attente",
			completed: "Terminée",
			failed: "Échouée",
		};
		return statusTranslations[englishStatus] || englishStatus;
	};

	{
		/** Récupérer les données de la campagne **/
	}
	const fetchCampaignDetails = async (campaignId) => {
		try {
			const response = await campaignService.getCampaignById(campaignId);
			if (response.success) {
				const { name, description, status, is_published } = response.data.data;
				const translatedStatus = translateStatus(status.label);
				setCampaignInfo({
					name,
					description,
					is_published,
					status: translatedStatus,
					originalStatus: status.label,
					statusValue: status.value,
					loading: false,
				});
			}
		} catch (error) {
			console.error("Erreur détails:", error);
			setCampaignInfo((prev) => ({ ...prev, loading: false }));
		}
	};

	{
		/** Récupérer les statistiques d'interaction **/
	}
	const fetchCampaignStats = async (campaignId) => {
		setLoading((prev) => ({ ...prev, stats: true }));
		try {
			const response =
				await campaignInteractionService.getCampaignStats(campaignId);
			if (response.success) {
				setCampaignData((prev) => ({ ...prev, interactionStats: response.data }));
			}
		} catch (error) {
			console.error("Erreur stats:", error);

			// Gestion spécifique de l'erreur 403
			if (error.response?.status === 403) {
				console.warn(
					"Accès interdit aux statistiques - campagne sans interactions"
				);
				// Définir des statistiques par défaut pour une campagne sans interactions
				setCampaignData((prev) => ({
					...prev,
					interactionStats: {
						total_interactions: 0,
						views: 0,
						clicks: 0,
						shares: 0,
						likes: 0,
						comments: 0,
					},
				}));
			}
		} finally {
			setLoading((prev) => ({ ...prev, stats: false }));
		}
	};

	{
		/** Récupérer les images de la campagne **/
	}
	const fetchImages = async (campaignId) => {
		setLoading((prev) => ({ ...prev, images: true }));
		try {
			const response = await imageService.getAllImages();
			if (response.success) {
				const campaignImages = response.data.data.filter(
					(img) => img.campaign_id == campaignId
				);
				setCampaignData((prev) => ({ ...prev, images: campaignImages }));
			}
		} catch (error) {
			console.error("Erreur images:", error);
		} finally {
			setLoading((prev) => ({ ...prev, images: false }));
		}
	};

	{
		/** Récupérer les posts de la campagne **/
	}
	const fetchPosts = async (campaignId) => {
		setLoading((prev) => ({ ...prev, posts: true }));
		try {
			const response = await socialPostService.getAllSocialPost({
				campaign_id: campaignId,
			});
			if (response.success) {
				const campaignPosts = response.data.data.filter(
					(post) => post.campaign_id == campaignId
				);
				setCampaignData((prev) => ({ ...prev, posts: campaignPosts }));
			}
		} catch (error) {
			console.error("Erreur posts:", error);
		} finally {
			setLoading((prev) => ({ ...prev, posts: false }));
		}
	};

	{
		/** Récupérer les landing pages de la campagne **/
	}
	const fetchLandingPages = async (campaignId) => {
		setLoading((prev) => ({ ...prev, landingPages: true }));
		try {
			const res = await landingPageService.getAll({
				campaign_id: campaignId,
			});
			if (res.success) {
				const campaignLandingPages = res.data.data.filter(
					(page) => page.campaign_id == campaignId
				);
				setCampaignData((prev) => ({ ...prev, landingPages: campaignLandingPages }));
			}
		} catch (error) {
			console.error("Erreur landing pages:", error);
		} finally {
			setLoading((prev) => ({ ...prev, landingPages: false }));
		}
	};

	{
		/** Charger toutes les données de la campagne **/
	}
	useEffect(() => {
		const fetchCampaignData = async () => {
			try {
				const campaignId = location.pathname.split("/").pop();

				await Promise.all([
					fetchCampaignDetails(campaignId),
					fetchCampaignStats(campaignId),
					fetchImages(campaignId),
					fetchPosts(campaignId),
					fetchLandingPages(campaignId),
				]);
			} catch (error) {
				console.error("Erreur lors de la récupération des données:", error);
			} finally {
				setLoading((prev) => ({ ...prev, all: false }));
			}
		};

		fetchCampaignData();
	}, [location.pathname, refreshTrigger]);

	{
		/** Récupérer le quota lorsque l'utilisateur est chargé **/
	}
	useEffect(() => {
		if (!authLoading && user?.id) {
			fetchQuotaData(user.id);
		}
	}, [user?.id, authLoading]);

	{
		/** Gestion des succès de mise à jour de la campagne et du rafraîchissement du contenu **/
	}
	const handleContentRefresh = () => {
		setRefreshTrigger((prev) => prev + 1);
		if (user?.id) {
			fetchQuotaData(user.id);
		}
	};

	return (
		<div className="container mx-auto px-4 sm:px-6 lg:px-8">
			<CampaignHeader
				name={campaignInfo.name}
				is_published={campaignInfo.is_published}
				description={campaignInfo.description}
				status={campaignInfo.status}
				originalStatus={campaignInfo.originalStatus}
				loading={campaignInfo.loading}
				onEdit={() => openModal("edit-campaign")}
				onShare={() => setIsShareModalOpen(true)}
			/>

			<CampaignChoiceSection
				onImageClick={() => openModal("image-marketing")}
				onPostClick={() => openModal("new-request")}
				onLandingPageClick={() => openModal("new-landing-page")}
			/>

			<section className="flex flex-col xl:flex-row xl:items-start gap-4 xl:gap-6 py-4">
				{/* Contenu principal - pleine largeur sur mobile, 3/4 sur desktop */}
				<div className="w-full xl:flex-1 xl:w-3/4">
					<CampaignTabs activeTab={activeTab} setActiveTab={setActiveTab} />
					<CampaignContent
						activeTab={activeTab}
						campaignData={campaignData}
						loading={loading}
						onImageClick={(image) => {
							setSelectedImage(image);
							openModal("image");
						}}
						onPostClick={(postId) => {
							setSelectedPostId(postId);
							openModal("post");
						}}
						onLandingPageClick={(landingPage) => {
							setSelectedLandingPage(landingPage);
							openModal("landing-page")
						}}
						setActiveTab={setActiveTab}
					/>
				</div>

				{/* Sidebar - en bas sur mobile/tablette, à droite sur desktop */}
				<div className="w-full xl:w-1/4 xl:max-w-sm">
					<CampaignSidebar
						posts={campaignData.posts}
						stats={campaignData.interactionStats}
						loadingStats={loading.stats}
						quotaPrompt={quotaPrompt}
						tarif={tarif}
						loadingQuota={loadingQuota}
						onContentRefresh={handleContentRefresh}
					/>
				</div>
			</section>

			<CampaignModals
				isOpen={isOpen}
				closeModal={closeModal}
				isPreview={isPreview}
				setIsPreview={setIsPreview}
				selectedImage={selectedImage}
				selectedPostId={selectedPostId}
				selectedLandingPage={selectedLandingPage}
				posts={campaignData.posts}
				campaignName={campaignInfo.name}
				campaignDescription={campaignInfo.description}
				onContentRefresh={handleContentRefresh}
				campaignId={campaignId}
				isShareModalOpen={isShareModalOpen}
				onCloseShareModal={() => setIsShareModalOpen(false)}
				onShareCampaign={handleShareCampaign}
				onDeletePost={handleDeletePost}
				onDeleteImage={handleDeleteImage}
				onDeleteLandingPage={() => {}}
				deleteConfirmOpen={deleteConfirmOpen}
				setDeleteConfirmOpen={setDeleteConfirmOpen}
				setSelectedPostId={setSelectedPostId}
				setSelectedLandingPage={setSelectedLandingPage}
			/>
		</div>
	);
};

export default Detail;
