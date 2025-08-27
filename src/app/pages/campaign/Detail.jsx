import React, { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router";
import useModal from "@hooks/useModal";
import useAuth from "@hooks/useAuth"; 
import { tarifUserService } from "@services/tarifUserService";
import { promptService } from "@services/promptService";
import { BsPieChart, BsBarChartLine } from "react-icons/bs";
import SectionBlock from "@layouts/SectionBlock";

import { imageService } from "@services/imageService";
import { socialPostService } from "@services/socialPostService";
import { campaignInteractionService } from "@services/campaignInteractionService";
import { campaignService } from "@services/campaignService";

import CampaignHeader from "./componentsDetails/CampaignHeader";
import CampaignTabs from "./componentsDetails/CampaignTabs";
import CampaignContent from "./componentsDetails/CampaignContent";
import CampaignModals from "./componentsDetails/CampaignModals";
import CampaignChoiceSection from "./componentsDetails/CampaignChoiceSection";

const Detail = () => {
	const location = useLocation();
	const { isOpen, openModal, closeModal } = useModal();
	const { user, loading: authLoading } = useAuth();
	const [isPreview, setIsPreview] = useState(false);
	const [selectedImage, setSelectedImage] = useState(null);
	const [selectedPostId, setSelectedPostId] = useState(null);
	const [activeTab, setActiveTab] = useState(0);
	const [refreshTrigger, setRefreshTrigger] = useState(0);
	const campaignId = location.pathname.split("/").pop();

	const [campaignInfo, setCampaignInfo] = useState({
		name: "",
		description: "",
		status: "",
		originalStatus: "",
		statusValue: "",
		loading: true
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
		landingPages: false,
		all: true,
	});
	
	const fetchQuotaData = async (userId) => {
		if (!userId) {
			console.warn("Aucun userId pour récupérer le quota");
			return;
		}
		setLoadingQuota(true);
		try {
			const [tarifResult, quotaResult] = await Promise.all([
				tarifUserService.getLatestByUserId(userId),
				promptService.getQuotaByUserId(userId)
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

	const translateStatus = (englishStatus) => {
		const statusTranslations = {
			"created": "Créée",
			"processing": "En traitement", 
			"pending": "En attente",
			"completed": "Terminée",
			"failed": "Échouée"
		};
		return statusTranslations[englishStatus] || englishStatus;
	};

	const fetchCampaignDetails = async (campaignId) => {
		try {
			const response = await campaignService.getCampaignById(campaignId);
			if (response.success) {
				const { name, description, status } = response.data.data;
				const translatedStatus = translateStatus(status.label);
				
				setCampaignInfo({
					name,
					description,
					status: translatedStatus,
					originalStatus: status.label,
					statusValue: status.value,
					loading: false
				});
			}
		} catch (error) {
			console.error("Erreur détails:", error);
			setCampaignInfo(prev => ({ ...prev, loading: false }));
		}
	};

	const fetchCampaignStats = async (campaignId) => {
		setLoading((prev) => ({ ...prev, stats: true }));
		try {
			const response = await campaignInteractionService.getCampaignStats(campaignId);
			if (response.success) {
				setCampaignData((prev) => ({ ...prev, interactionStats: response.data }));
			}
		} catch (error) {
			console.error("Erreur stats:", error);
		} finally {
			setLoading((prev) => ({ ...prev, stats: false }));
		}
	};

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
	
	useEffect(() => {
		const fetchCampaignData = async () => {
			try {
				const campaignId = location.pathname.split("/").pop();
				
				await Promise.all([
					fetchCampaignDetails(campaignId),
					fetchCampaignStats(campaignId),
					fetchImages(campaignId),
					fetchPosts(campaignId),
				]);
			} catch (error) {
				console.error("Erreur lors de la récupération des données:", error);
			} finally {
				setLoading((prev) => ({ ...prev, all: false }));
			}
		};

		fetchCampaignData();
	}, [location.pathname, refreshTrigger]);

	
	useEffect(() => {
		if (!authLoading && user?.id) {
			fetchQuotaData(user.id);
		}
	}, [user?.id, authLoading]);

	const handleCampaignUpdateSuccess = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	const handleContentRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

	const dailyQuotaUsed = quotaPrompt;
	const maxLimit = tarif;
	const remaining = Math.max(0, maxLimit - dailyQuotaUsed);
	const percentage = maxLimit > 0 ? Math.min((dailyQuotaUsed / maxLimit) * 100, 100) : 0;
	const progressBarColor = dailyQuotaUsed >= maxLimit ? "bg-red-600" : "bg-blue-600";

	return (
		<div className="container mx-auto">
			<CampaignHeader
				name={campaignInfo.name}
				description={campaignInfo.description}
				status={campaignInfo.status}
				originalStatus={campaignInfo.originalStatus}
				loading={campaignInfo.loading}
				onEdit={() => openModal("edit-campaign")}
				onShare={() => openModal("share-confirmation")} 
			/>

			<CampaignChoiceSection
				onImageClick={() => openModal("image-marketing")}
				onPostClick={() => openModal("new-request")}
				onLandingPageClick={() => openModal("landing-page")}
			/>

			<section className="flex items-start gap-6 py-4">
				<div className="flex-3/4">
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
						onLandingPageClick={() => openModal("landing-page")}
						setActiveTab={setActiveTab}
					/>
				</div>

				{/* Sidebar avec le quota intégré */}
				<aside className="flex-1/4 space-y-4">
					{/* Section Activités de la campagne */}
					<SectionBlock title="Activités de la campagne" icon={<BsBarChartLine />}>
						<div className="my-2">
							<span className="text-sm font-semibold">Les réseaux sociaux utilisés</span>
							<div className="text-sm text-gray-500 mt-1">Aucun réseau social utilisé</div>
						</div>
						<CampaignStats stats={campaignData.interactionStats} loading={loading.stats} />
					</SectionBlock>
					
					{/* Section Quota intégrée directement */}
					<SectionBlock title="Quota utilisé" icon={<BsPieChart />}>
						<div className="flex items-center justify-between gap-2">
							<span>Quotas utilisés</span>
							<strong>
								{loadingQuota || authLoading ? (
									<span className="inline-block h-4 w-10 animate-pulse rounded bg-gray-300"></span>
								) : (
									`${dailyQuotaUsed}/${maxLimit}`
								)}
							</strong>
						</div>
						
						<div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
							<div
								className={`h-2.5 rounded-full transition-all duration-1000 ${progressBarColor}`}
								style={{
									width: `${percentage}%`
								}}
							></div>
						</div>
						
						<div className="mt-4 text-sm">
							{loadingQuota || authLoading ? (
								<span className="inline-block h-4 w-40 animate-pulse rounded bg-gray-300"></span>
							) : dailyQuotaUsed >= maxLimit ? (
								<span className="text-red-600 font-semibold">
									Quota dépassé ! Vous ne pouvez plus lancer de prompts aujourd'hui.
								</span>
							) : (
								<span>
									Il vous reste <strong>{remaining}</strong> quota{remaining !== 1 ? 's' : ''} aujourd'hui.
								</span>
							)}
						</div>
					</SectionBlock>
				</aside>
			</section>

			<CampaignModals
				isOpen={isOpen}
				closeModal={closeModal}
				isPreview={isPreview}
				setIsPreview={setIsPreview}
				selectedImage={selectedImage}
				selectedPostId={selectedPostId}
				posts={campaignData.posts}
				campaignName={campaignInfo.name}
				campaignDescription={campaignInfo.description}
				onCampaignUpdateSuccess={handleCampaignUpdateSuccess}
				onContentRefresh={handleContentRefresh}
				campaignId={campaignId}
			/>
		</div>
	);
};

const CampaignStats = ({ stats, loading }) => {
	if (!stats && !loading) {
		return (
			<div className="my-2">
				<div className="text-sm text-gray-500">Aucune statistique disponible</div>
			</div>
		);
	}

	const safeStats = stats || {};
	const statValues = {
		likes: safeStats.likes || 0,
		views: safeStats.views || 0,
		shares: safeStats.shares || 0
	};

	return (
		<div className="my-2">
			{["likes", "views", "shares"].map(stat => (
				<div key={stat} className="my-2">
					<span className="text-sm font-semibold capitalize">
						{stat === "likes" ? "Mentions j'aime" : 
						 stat === "views" ? "Nombre de vues" : "Partages"}
					</span>
					<div className="table bg-linear-0 from-gray-500/10 to-transparent rounded-xl px-4 py-2">
						<strong className="text-2xl">
							{loading ? (
								<span className="inline-block h-6 w-6 animate-pulse rounded-full bg-gray-300"></span>
							) : (
								statValues[stat]
							)}
						</strong>
					</div>
				</div>
			))}
		</div>
	);
};

export default Detail;