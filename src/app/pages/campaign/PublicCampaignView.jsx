import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { campaignService } from "@services/campaignService";
import { imageService } from "@services/imageService";
import { socialPostService } from "@services/socialPostService";
import { landingPageService } from "@services/landingPageService";
import { campaignInteractionService } from "@services/campaignInteractionService";
import Button from "@shared/Button";
import {
	FiArrowLeft,
	FiUser,
	FiCalendar,
	FiEye,
	FiHeart,
	FiShare2,
	FiExternalLink,
	FiImage,
	FiFileText,
	FiMonitor,
} from "react-icons/fi";
import CampaignLandingPageItem from "@components/Campaign/CampaignLandingPageItem";
import { processTemplate } from "@shared/templateUtils";
import LoadingCampaignsState from "@components/allCampaigns/LoadingCampaignsState";

const PublicCampaignView = () => {
	const { campaignId } = useParams();
	const navigate = useNavigate();

	const [campaignInfo, setCampaignInfo] = useState({
		name: "",
		description: "",
		user: null,
		created_at: "",
		is_published: false,
		loading: true,
		error: null,
	});

	const [campaignData, setCampaignData] = useState({
		images: [],
		posts: [],
		landingPages: [],
		stats: null,
	});

	const [loading, setLoading] = useState({
		images: true,
		posts: true,
		landingPages: true,
		stats: true,
	});

	const [activeTab, setActiveTab] = useState(0);
	const [selectedItem, setSelectedItem] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);
	const [landingPagePreview, setLandingPagePreview] = useState(false);
	const [landingPageContent, setLandingPageContent] = useState(null);

	// Fonction pour générer le HTML de la landing page
	const generateLandingPageHTML = useCallback((landingPageData) => {
		if (!landingPageData) {
			return `
				<div style="display: flex; justify-content: center; align-items: center; height: 90vh;">
					<p style="color: #999;">Aucun contenu disponible</p>
				</div>
			`;
		}

		if (
			landingPageData?.content?.template?.html &&
			landingPageData?.content?.template?.data
		) {
			const processedHTML = processTemplate(
				landingPageData.content.template.html,
				landingPageData.content.template.data
			);

			return (
				processedHTML ||
				`
				<div style="display: flex; justify-content: center; align-items: center; height: 90vh">
					<p style="color: #f39c12;">Template vide après traitement</p>
				</div>
			`
			);
		}

		return `
			<div style="display: flex; justify-content: center; align-items: center; height: 90vh; font-family: Arial, sans-serif;">
				<p style="color: #999;">Aucun contenu disponible</p>
			</div>
		`;
	}, []);

	// Récupérer les détails de la campagne
	const fetchCampaignDetails = async (campaignId) => {
		try {
			const response = await campaignService.getCampaignById(campaignId);
			console.log(response.data.data);

			if (response.success) {
				const {
					name,
					description,
					user,
					dates,
					is_published,
					status,
					total_likes,
					total_shares,
					total_views,
					user_has_liked,
					user_has_shared,
				} = response.data.data;

				if (!is_published) {
					setCampaignInfo((prev) => ({
						...prev,
						loading: false,
						error: "Cette campagne n'est pas publique",
					}));
					return;
				}

				setCampaignInfo({
					name,
					description,
					user,
					created_at: dates?.created_at ?? null,
					status: status?.label ?? "inconnu",
					total_likes,
					total_shares,
					total_views,
					user_has_liked,
					user_has_shared,
					is_published,
					loading: false,
					error: null,
				});
			}
		} catch (error) {
			console.error("Erreur détails:", error);
			setCampaignInfo((prev) => ({
				...prev,
				loading: false,
				error: "Campagne non trouvée ou privée",
			}));
		}
	};

	// Récupérer les statistiques
	const fetchStats = async (campaignId) => {
		try {
			const response =
				await campaignInteractionService.getCampaignStats(campaignId);
			if (response.success) {
				setCampaignData((prev) => ({ ...prev, stats: response.data }));
			}
		} catch (error) {
			console.log("Erreur stats:", error);
			setCampaignData((prev) => ({
				...prev,
				stats: {
					total_interactions: 0,
					views: 0,
					likes: 0,
					shares: 0,
					comments: 0,
				},
			}));
		} finally {
			setLoading((prev) => ({ ...prev, stats: false }));
		}
	};

	// Récupérer les images
	const fetchImages = async (campaignId) => {
		try {
			const response = await imageService.getAllImages();
			if (response.success) {
				// Filtrer les images pour cette campagne
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

	// Récupérer les posts
	const fetchPosts = async (campaignId) => {
		try {
			const response = await socialPostService.getAllSocialPost({
				campaign_id: campaignId,
			});
			if (response.success) {
				// Filtrer les posts pour cette campagne
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

	// Récupérer les landing pages
	const fetchLandingPages = async (campaignId) => {
		try {
			const response = await landingPageService.getAll({
				campaign_id: campaignId,
			});
			console.log(response);
			if (response.success) {
				// Filtrer les landing pages pour cette campagne
				const campaignLandingPages = response.data.data.filter(
					(page) => page.campaign_id == campaignId
				);
				setCampaignData((prev) => ({
					...prev,
					landingPages: campaignLandingPages,
				}));
			}
		} catch (error) {
			console.error("Erreur landing pages:", error);
		} finally {
			setLoading((prev) => ({ ...prev, landingPages: false }));
		}
	};

	useEffect(() => {
		if (campaignId) {
			fetchCampaignDetails(campaignId);

			Promise.all([
				fetchStats(campaignId),
				fetchImages(campaignId),
				fetchPosts(campaignId),
				fetchLandingPages(campaignId),
			]);
		}
	}, [campaignId]);

	// Ouvrir le modal avec l'élément sélectionné
	const openModal = (item, type) => {
		if (type === "landingPage") {
			// Pour les landing pages, on affiche en plein écran
			setLandingPageContent(item);
			setLandingPagePreview(true);
		} else {
			setSelectedItem({ ...item, type });
			setModalOpen(true);
		}
	};

	// Fonction pour gérer le clic sur une landing page
	const handleLandingPageClick = (landingPageId) => {
		const landingPage = campaignData.landingPages.find(
			(page) => page.id === landingPageId
		);
		if (landingPage) {
			openModal(landingPage, "landingPage");
		}
	};

	const closeModal = () => {
		setModalOpen(false);
		setSelectedItem(null);
	};

	const closeLandingPagePreview = () => {
		setLandingPagePreview(false);
		setLandingPageContent(null);
	};

	// Composant de chargement
	if (campaignInfo.loading) {
		return <LoadingCampaignsState />;
	}

	// Gestion des erreurs
	if (campaignInfo.error) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
				<div className="text-center p-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
						{campaignInfo.error}
					</h2>
					<Button
						variant="outline"
						color="neutral"
						circle
						className="h-12 w-12 mr-4"
						onClick={() => navigate(-1)}
					>
						<FiArrowLeft size={20} />
					</Button>
				</div>
			</div>
		);
	}

	const tabs = [
		{ name: "Images", icon: FiImage, count: campaignData.images.length },
		{ name: "Posts", icon: FiFileText, count: campaignData.posts.length },
		{
			name: "Landing Pages",
			icon: FiMonitor,
			count: campaignData.landingPages.length,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							color="neutral"
							circle
							className="h-12 w-12 mr-4"
							onClick={() => navigate(-1)}
						>
							<FiArrowLeft size={20} />
						</Button>

						<div className="flex items-center gap-4">
							{campaignData.stats && (
								<div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
									{/* Vues */}
									<div className="flex items-center gap-1">
										<FiEye size={16} />
										<span>{campaignData.stats.views || 0}</span>
									</div>

									{/* Likes */}
									<div
										className={`flex items-center gap-1 ${
											campaignInfo.user_has_liked ? "text-red-500" : ""
										}`}
									>
										<FiHeart
											size={16}
											className={campaignInfo.user_has_liked ? "fill-red-500" : ""}
										/>
										<span>{campaignData.stats.likes || 0}</span>
									</div>

									{/* Partages */}
									<div className="flex items-center gap-1">
										<FiShare2 size={16} />
										<span>{campaignData.stats.shares || 0}</span>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Contenu principal */}
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Informations de la campagne */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
						<div className="flex-1">
							<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
								{campaignInfo.name}
							</h1>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								{campaignInfo.description}
							</p>

							<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
								{campaignInfo.user && (
									<div className="flex items-center gap-2">
										<FiUser size={16} />
										<span>Par {campaignInfo.user.name}</span>
									</div>
								)}
								<div className="flex items-center gap-2">
									<FiCalendar size={16} />
									<span>
										Créée le{" "}
										{new Date(campaignInfo.created_at).toLocaleDateString("fr-FR")}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Onglets */}
				<section className="flex flex-col xl:flex-row xl:items-start gap-4 xl:gap-6 py-4">
					{/* Navigation des onglets */}
					<div className="flex xl:flex-col gap-2 xl:gap-4 overflow-x-auto xl:overflow-x-visible border-b xl:border-b-0 xl:border-r border-gray-200 dark:border-gray-700 px-1 py-1">
						{tabs.map((tab, index) => (
							<button
								key={index}
								onClick={() => setActiveTab(index)}
								className={`flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300 rounded-lg cursor-pointer ${
									activeTab === index
										? "text-[#a142d1] bg-[#f3ebff] dark:bg-[#2a1b3d] border-b-0 xl:border-l-2 border-[#a142d1] shadow-sm"
										: "text-gray-600 dark:text-gray-300 hover:text-[#a142d1] hover:bg-gray-50 dark:hover:bg-gray-700"
								}`}
							>
								<tab.icon size={16} />
								<span>{tab.name}</span>
								<span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full text-xs font-semibold">
									{tab.count}
								</span>
							</button>
						))}
					</div>

					{/* Contenu des onglets */}
					<div className="flex-1">
						{activeTab === 0 && (
							<div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
								{loading.images ? (
									Array.from({ length: 4 }).map((_, index) => (
										<div
											key={index}
											className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
										></div>
									))
								) : campaignData.images.length > 0 ? (
									campaignData.images.map((image) => (
										<div
											key={image.id}
											onClick={() => openModal(image, "image")}
											className="cursor-pointer bg-gray-100 dark:bg-gray-700 border border-[#a142d1] rounded-xl p-3 flex items-center justify-center shadow-sm hover:shadow-lg transition-transform duration-300 hover:scale-105"
										>
											<img
												src={image.path}
												alt={image.prompt}
												className="max-w-full max-h-full object-contain rounded-lg"
											/>
										</div>
									))
								) : (
									<div className="col-span-full text-center py-8 sm:py-12">
										<FiImage size={40} className="mx-auto text-gray-400 mb-3" />
										<p className="text-gray-500 dark:text-gray-400">
											Aucune image disponible
										</p>
									</div>
								)}
							</div>
						)}

						{activeTab === 1 && (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
								{loading.posts ? (
									Array.from({ length: 2 }).map((_, index) => (
										<div
											key={index}
											className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 animate-pulse"
										>
											<div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
											<div className="h-20 bg-gray-200 dark:bg-gray-600 rounded"></div>
										</div>
									))
								) : campaignData.posts.length > 0 ? (
									campaignData.posts.map((post) => (
										<div
											key={post.id}
											onClick={() => openModal(post, "post")}
											className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 sm:p-4 cursor-pointer hover:shadow-lg transition-all duration-200"
										>
											<div className="flex items-center justify-between mb-2 sm:mb-3">
												<span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
													{post.created_at}
												</span>
												<FiExternalLink size={14} className="text-gray-400" />
											</div>
											<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-4">
												{post.content}
											</p>
										</div>
									))
								) : (
									<div className="col-span-full text-center py-8 sm:py-12">
										<FiFileText size={40} className="mx-auto text-gray-400 mb-3" />
										<p className="text-gray-500 dark:text-gray-400">
											Aucun post disponible
										</p>
									</div>
								)}
							</div>
						)}

						{activeTab === 2 && (
							<div className="space-y-3 sm:space-y-4">
								{loading.landingPages ? (
									Array.from({ length: 3 }).map((_, index) => (
										<div
											key={index}
											className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 animate-pulse"
										>
											<div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-3"></div>
											<div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
										</div>
									))
								) : campaignData.landingPages.length > 0 ? (
									campaignData.landingPages.map((page) => (
										<CampaignLandingPageItem
											key={page.id}
											campaignLandingPage={page}
											isLoading={false}
											onClick={handleLandingPageClick}
										/>
									))
								) : (
									<div className="text-center py-8 sm:py-12">
										<FiMonitor size={40} className="mx-auto text-gray-400 mb-3" />
										<p className="text-gray-500 dark:text-gray-400">
											Aucune landing page disponible
										</p>
									</div>
								)}
							</div>
						)}
					</div>
				</section>
			</div>

			{/* Modal pour afficher les éléments */}
			{modalOpen && selectedItem && (
				<div
					className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
					onClick={closeModal}
				>
					<div
						className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="p-6">
							<div className="flex justify-between items-start mb-4">
								<h2 className="text-xl font-bold text-gray-900 dark:text-white">
									{selectedItem.type === "image" && "Image"}
									{selectedItem.type === "post" && `Post ${selectedItem.created_at}`}
								</h2>
								<button
									onClick={closeModal}
									className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>

							{selectedItem.type === "image" && (
								<div>
									<img
										src={selectedItem.path}
										alt={selectedItem.prompt}
										className="w-full max-h-96 object-contain rounded-lg mb-4"
									/>
									<p className="text-gray-600 text-center dark:text-gray-300">
										{selectedItem.prompt}
									</p>
								</div>
							)}

							{selectedItem.type === "post" && (
								<div>
									<div className="mb-4 inline-block bg-[#a142d1] text-white px-3 py-1 rounded-full text-sm"></div>
									<div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
										{selectedItem.content}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			{/* Vue plein écran de la landing page */}
			{landingPagePreview && landingPageContent && (
				<div className="fixed inset-0 bg-gray-50 dark:bg-gray-900 z-50 flex flex-col">
					{/* Header avec bouton de fermeture */}
					<div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
						<div className="flex items-center justify-between">
							<h2 className="text-xl font-bold text-gray-900 dark:text-white">
								{landingPageContent.content?.template?.data?.hero?.title ||
									"Landing Page"}
							</h2>
							<button
								onClick={closeLandingPagePreview}
								className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>
					</div>

					{/* Contenu de la landing page */}
					<div className="flex-1 p-4">
						<div className="h-full rounded-xl overflow-hidden shadow-lg">
							<iframe
								className="w-full h-full border-0"
								srcDoc={`<!DOCTYPE html><html><head><title>Landing Page Preview</title></head><body>${generateLandingPageHTML(landingPageContent)}</body></html>`}
								title="Landing Page Preview"
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default PublicCampaignView;
