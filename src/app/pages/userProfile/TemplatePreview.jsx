import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	BsArrowLeft,
	BsPlay,
	BsDownload,
	BsHeart,
	BsHeartFill,
	BsShare,
	BsStar,
	BsStarFill,
	BsEye,
	BsCalendar,
	BsClock,
	BsTag,
	BsPeople,
	BsBarChart,
	BsBullseye,
	BsMegaphone,
	BsShop,
	BsRocket,
	BsStarHalf,
	BsGrid,
	BsList,
} from "react-icons/bs";
import Button from "@shared/Button";
import { campaignTemplateService } from "@services/campaignTemplates";
import LoadingCampaignsState from "@components/allCampaigns/LoadingCampaignsState";
import { Card } from "@shared/Card";
import { campaignService } from "@services/campaignService";
import MessageNotification from "@shared/MessageNotification";

const TemplatePreview = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [liked, setLiked] = useState(false);
	const [activeTab, setActiveTab] = useState("overview");
	const [campaign, setCampaign] = useState(null);
	const [userRating, setUserRating] = useState(0);
	const [hasRated, setHasRated] = useState(false);
	const [isUsing, setIsUsing] = useState(false);
	const [notification, setNotification] = useState({
		message: "",
		type: "info" /*"success", "error", "warning", "info"*/,
		isVisible: false,
	});

	const showNotification = (message, type = "info") => {
		setNotification({
			message,
			type,
			isVisible: true,
		});
	};

	// Chargement des données du template
	useEffect(() => {
		const loadCampaignTemplate = async () => {
			try {
				setLoading(true);
				setError(null);

				const result = await campaignTemplateService.getCampaignTemplateById(id);
				if (result.success) {
					setCampaign(result.data.data);
				} else {
					setError(result.error || "Erreur lors du chargement du template");
					console.error("Erreur:", result.error);
				}
			} catch (err) {
				setError("Une erreur inattendue s'est produite");
				console.error("Erreur inattendue:", err);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			loadCampaignTemplate();
		}
	}, [id]);

	const iconComponents = {
		BsShop,
		BsRocket,
		BsMegaphone,
		BsBullseye,
		BsPeople,
		BsTag,
	};

	const handleUseCampaign = async (e) => {
		e.preventDefault();

		if (campaign) {
			console.log(campaign.socialPosts);
			try {
				setIsUsing(true);
				const response = await campaignService.createCampaignByTemplate({
					name: campaign.name,
					description: campaign.description,
					type_campaign_id: campaign.type.id,
					template_id: campaign.id,
					social_posts: campaign.socialPosts,
				});

				if (response.success) {
					showNotification("Campagne créée avec succès !", "success");
					setTimeout(() => {
						navigate(`/campaign/${response.data.data.id}`);
					}, 1500);
				} else {
					showNotification(
						"Erreur lors de la création : " + response.message,
						"error"
					);
				}
			} catch (error) {
				console.error("Erreur lors de la création :", error);
				showNotification("Une erreur est survenue lors de la création.", "error");
			} finally {
				setIsUsing(false);
			}
		}
	};

	const handleRate = async (star) => {
		if (hasRated) return;

		setHasRated(true);
		let newRating = star;
		if (userRating === star) {
			newRating = star - 1;
		}
		setUserRating(newRating);

		if (campaign?.id) {
			try {
				const result = await campaignTemplateService.upsertRating(
					campaign.id,
					newRating
				);
				if (!result.success) {
					console.error(
						"Erreur lors de l'enregistrement de la note :",
						result.error
					);
				} else {
					console.log("Note enregistrée avec succès !");
				}
			} catch (err) {
				console.error(
					"Erreur inattendue lors de l'enregistrement de la note :",
					err
				);
			}
		}
	};

	if (loading) {
		return <LoadingCampaignsState />;
	}

	if (error) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex items-center justify-center">
				<div className="text-center">
					<div className="text-red-500 text-lg mb-4">⚠️</div>
					<h2 className="text-xl font-semibold mb-2">Erreur</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-[#a142d1] text-white px-4 py-2 rounded-lg"
					>
						Retour
					</button>
				</div>
			</div>
		);
	}

	if (!campaign) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white flex items-center justify-center">
				<div className="text-center">
					<div className="text-gray-400 text-lg mb-4">😢</div>
					<h2 className="text-xl font-semibold mb-2">Template non trouvé</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-4">
						Le template demandé n'existe pas ou a été supprimé.
					</p>
					<button
						onClick={() => navigate(-1)}
						className="bg-[#a142d1] text-white px-4 py-2 rounded-lg"
					>
						Retour
					</button>
				</div>
			</div>
		);
	}

	// Détermine l'icône de catégorie
	const CategoryIcon = iconComponents[campaign.category?.icon] || BsTag;

	return (
		<>
			{/* Notification */}
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
				autoHide={true}
				duration={5000}
				position="top-center"
				showProgressBar={true}
			/>
			<div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-colors">
				<div className="container mx-auto py-8 px-4">
					{/* Header */}
					<div className="flex flex-col md:flex-row items-start md:items-center mb-8 gap-4 md:gap-6 w-full">
						{/* Bouton retour */}
						<Button
							variant="outline"
							color="neutral"
							circle
							className="h-12 w-12 flex-shrink-0"
							onClick={() => navigate(-1)}
						>
							<BsArrowLeft size={20} />
						</Button>

						{/* Titre et description */}
						<div className="flex-1 w-full md:w-auto">
							<div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 mb-2 flex-wrap">
								<CategoryIcon className="text-[#a142d1]" size={24} />
								<h1 className="text-2xl sm:text-3xl font-bold break-words">
									{campaign.name}
								</h1>
								{campaign.isPremium && (
									<span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-sm font-bold px-3 py-1 rounded-full mt-2 sm:mt-0">
										PRO
									</span>
								)}
							</div>
							<p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
								{campaign.description}
							</p>
						</div>

						{/* Évaluations et bouton */}
						<div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
							{/* Ratings */}
							<div className="flex items-center gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										onClick={() => handleRate(star)}
										className={`text-yellow-400 hover:text-yellow-500 transition-colors ${hasRated ? "cursor-not-allowed opacity-50" : ""}`}
										disabled={hasRated}
									>
										{userRating >= star ? <BsStarFill /> : <BsStar />}
									</button>
								))}
								<span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
									{userRating}/5
								</span>
							</div>

							{/* Bouton utiliser */}
							<Button onClick={handleUseCampaign} disabled={isUsing}>
								{isUsing ? (
									<>
										<div className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></div>
										Création...
									</>
								) : (
									<>
										<BsPlay size={16} />
										Utiliser ce modèle
									</>
								)}
							</Button>
						</div>
					</div>

					{/* Hero Image & Stats */}
					<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
						<div className="relative h-64 lg:h-80">
							<img
								src={campaign.thumbnail}
								alt={campaign.name}
								className="w-full h-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
							<div className="absolute bottom-6 left-6 right-6">
								<div className="flex items-center gap-4 text-white text-sm mb-4">
									{campaign.category && (
										<span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full capitalize">
											{campaign.category.name}
										</span>
									)}
									{campaign.type && (
										<span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full">
											{campaign.type.name}
										</span>
									)}
								</div>
								<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
									<div className="bg-white/10 backdrop-blur p-3 rounded-lg">
										<div className="flex items-center gap-2 text-white/80 text-xs mb-1">
											<BsStarFill className="text-yellow-400" />
											Note
										</div>
										<div className="text-white text-lg font-semibold">
											{campaign.ratings_avg_rating || campaign.rating}/5
										</div>
									</div>
									<div className="bg-white/10 backdrop-blur p-3 rounded-lg">
										<div className="flex items-center gap-2 text-white/80 text-xs mb-1">
											<BsDownload />
											Utilisations
										</div>
										<div className="text-white text-lg font-semibold">
											{campaign.uses_count || campaign.uses}
										</div>
									</div>
									<div className="bg-white/10 backdrop-blur p-3 rounded-lg">
										<div className="flex items-center gap-2 text-white/80 text-xs mb-1">
											<BsPeople />
											Auteur
										</div>
										<div className="text-white text-sm font-semibold">
											{campaign.author}
										</div>
									</div>
									<div className="bg-white/10 backdrop-blur p-3 rounded-lg">
										<div className="flex items-center gap-2 text-white/80 text-xs mb-1">
											<BsCalendar />
											Créé le
										</div>
										<div className="text-white text-sm font-semibold">
											{new Date(campaign.createdAt).toLocaleDateString("fr-FR")}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Navigation tabs */}
					<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 mb-8">
						<div className="flex border-b border-gray-200 dark:border-gray-800">
							<button
								onClick={() => setActiveTab("overview")}
								className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
									activeTab === "overview"
										? "text-[#a142d1] border-[#a142d1]"
										: "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
								}`}
							>
								Vue d'ensemble
							</button>
							<button
								onClick={() => setActiveTab("details")}
								className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
									activeTab === "details"
										? "text-[#a142d1] border-[#a142d1]"
										: "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
								}`}
							>
								Détails
							</button>
						</div>

						{/* Tab content */}
						<div className="p-6 space-y-8">
							{/* Vue d'ensemble */}
							{activeTab === "overview" && (
								<div className="space-y-8">
									{/* Preview du contenu */}
									<Card>
										<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
											<BsEye className="text-[#a142d1]" />
											Aperçu du message principal
										</h3>
										<div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
											<p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
												"{campaign.preview}"
											</p>
										</div>
									</Card>

									{/* Informations principales */}
									<div className="grid lg:grid-cols-2 gap-6">
										{/* Catégorie et Type */}
										<Card>
											<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
												<BsTag className="text-[#a142d1]" />
												Catégorie et Type
											</h3>
											<div className="space-y-4">
												{campaign.category && (
													<div className="flex items-center gap-3">
														<CategoryIcon className="text-[#a142d1]" size={20} />
														<div>
															<span className="text-sm text-gray-500 dark:text-gray-400">
																Catégorie:
															</span>
															<p className="font-semibold capitalize">
																{campaign.category.name}
															</p>
														</div>
													</div>
												)}
												{campaign.type && (
													<div className="flex items-center gap-3">
														<BsBullseye className="text-[#a142d1]" size={20} />
														<div>
															<span className="text-sm text-gray-500 dark:text-gray-400">
																Type de campagne:
															</span>
															<p className="font-semibold">{campaign.type.name}</p>
														</div>
													</div>
												)}
											</div>
										</Card>

										{/* Statistiques */}
										<Card>
											<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
												<BsBarChart className="text-[#a142d1]" />
												Statistiques
											</h3>
											<div className="grid grid-cols-2 gap-4 w-full">
												{/* Note */}
												<div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
													<BsStarFill className="text-yellow-500 mb-1" size={20} />
													<span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
														Note
													</span>
													<div className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-1">
														{campaign.ratings_avg_rating || campaign.rating}/5
													</div>
												</div>

												{/* Utilisations */}
												<div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center">
													<BsDownload className="text-green-600 mb-1" size={20} />
													<span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
														Utilisations
													</span>
													<div className="text-xl font-bold text-gray-900 dark:text-gray-200 mt-1">
														{campaign.uses_count || campaign.uses}
													</div>
												</div>
											</div>
										</Card>
									</div>

									{/* Tags */}
									{campaign.tags && campaign.tags.length > 0 && (
										<Card>
											<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
												<BsTag className="text-[#a142d1]" />
												Tags associés
											</h3>
											<div className="flex flex-wrap gap-2">
												{campaign.tags.map((tag, index) => (
													<span
														key={index}
														className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-200 dark:border-gray-700"
													>
														{typeof tag === "object" ? `#${tag.name}` : `#${tag}`}
													</span>
												))}
											</div>
										</Card>
									)}
								</div>
							)}

							{/* Détails */}
							{activeTab === "details" && (
								<div className="space-y-8">
									{/* Auteur et dates */}
									<Card>
										<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
											Créé par
										</h3>
										<div className="flex items-center gap-4">
											<div className="w-16 h-16 bg-[#a142d1] rounded-full flex items-center justify-center text-white font-bold text-xl">
												{campaign.author?.charAt(0).toUpperCase() || "U"}
											</div>
											<div>
												<p className="font-semibold text-lg">
													{campaign.author || "Utilisateur"}
												</p>
												<p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
													<BsCalendar size={12} />
													Créé le {new Date(campaign.createdAt).toLocaleDateString("fr-FR")}
												</p>
											</div>
										</div>
									</Card>

									{/* Description complète */}
									<Card>
										<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
											Description
										</h3>
										<p className="text-gray-700 dark:text-gray-300 leading-relaxed">
											{campaign.description}
										</p>
									</Card>

									{/* Miniature */}
									{campaign.thumbnail && (
										<Card>
											<h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
												Image de présentation
											</h3>
											<div className="max-w-md">
												<img
													src={campaign.thumbnail}
													alt={campaign.name}
													className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
												/>
											</div>
										</Card>
									)}

									{/* Exemples de posts sociaux */}
									{campaign.socialPosts && campaign.socialPosts.length > 0 && (
										<Card>
											<h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-200">
												<BsMegaphone className="text-[#a142d1]" />
												Exemples de posts sociaux
											</h3>
											<div className="space-y-4">
												{campaign.socialPosts.map((post) => (
													<div
														key={post.id}
														className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
													>
														<div className="flex justify-between items-center mb-2">
															<span className="text-sm text-gray-500 dark:text-gray-400">
																{post.social?.name || "Réseau inconnu"}
															</span>
															<span className="text-xs text-gray-400">
																{new Date(post.created_at).toLocaleDateString("fr-FR")}
															</span>
														</div>
														<p className="text-gray-800 dark:text-gray-200">{post.content}</p>
													</div>
												))}
											</div>
										</Card>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Actions en bas */}
					<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
						<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
							<div>
								<h3 className="font-semibold mb-2">Prêt à utiliser ce modèle ?</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">
									Personnalisez cette campagne selon vos besoins et lancez-la en quelques
									clics.
								</p>
							</div>
							<div className="flex gap-3">
								<Button onClick={handleUseCampaign} disabled={isUsing}>
									{isUsing ? (
										<>
											<div className="animate-spin border-2 border-t-transparent border-white rounded-full w-4 h-4 mr-2"></div>
											Création...
										</>
									) : (
										<>
											<BsPlay size={16} />
											Utiliser maintenant
										</>
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default TemplatePreview;
