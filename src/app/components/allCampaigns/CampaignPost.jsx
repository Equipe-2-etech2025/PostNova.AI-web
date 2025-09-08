import React, { useState } from "react";
import {
	FiHeart,
	FiShare2,
	FiEye,
	FiChevronLeft,
	FiChevronRight,
	FiGlobe,
	FiFileText,
	FiImage,
	FiBookmark,
	FiMoreHorizontal,
} from "react-icons/fi";
import { Card } from "@shared/Card";
import Button from "@shared/Button";
import { Badge } from "@shared/Badge";
import { Link } from "react-router";
import { useCampaigns } from "@hooks/useCampaigns";

const CampaignPost = ({
	campaign,
	onLike,
	onShare,
	onBookmark,
	currentUserId,
	isLiked,
}) => {
	const [isLiking, setIsLiking] = useState(false);
	const [isSharing, setIsSharing] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const { handleView } = useCampaigns();

	const statusColors = {
		1: "blue", // created
		2: "green", // active
		3: "yellow", // paused
		4: "gray", // completed
		5: "red", // cancelled
	};

	const nextImage = () => {
		if (campaign.images && campaign.images.length > 1) {
			setCurrentImageIndex((prev) => (prev + 1) % campaign.images.length);
		}
	};

	const prevImage = () => {
		if (campaign.images && campaign.images.length > 1) {
			setCurrentImageIndex(
				(prev) => (prev - 1 + campaign.images.length) % campaign.images.length
			);
		}
	};

	const formatNumber = (num) => {
		if (num >= 1000) {
			return Math.floor(num / 1000) + "k";
		}
		return num;
	};

	const handleLike = async () => {
		if (isLiking || !currentUserId || !campaign?.id) return;

		setIsLiking(true);
		try {
			const interactionData = {
				campaign_id: campaign.id,
				user_id: currentUserId,
				likes: 1,
				views: 0,
				shares: 0,
			};
			await onLike(campaign.id, interactionData);
		} catch (error) {
			console.error("Erreur lors du like:", error);
		} finally {
			setIsLiking(false);
		}
	};

	const handleShare = async () => {
		if (isSharing || !currentUserId || !campaign?.id) return;

		setIsSharing(true);
		try {
			const interactionData = {
				campaign_id: campaign.id,
				user_id: currentUserId,
				likes: 0,
				views: 0,
				shares: 1,
			};
			await onShare(campaign.id, interactionData);
		} catch (error) {
			console.error("Erreur lors du partage:", error);
		} finally {
			setIsSharing(false);
		}
	};

	return (
		<Card className="mb-4 overflow-hidden">
			{/* Header du post */}
			<div className="flex items-center justify-between p-4 pb-3">
				<div className="flex items-center gap-3">
					<div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
						{campaign.user?.name?.charAt(0) || "U"}
					</div>
					<div>
						<div className="flex items-center gap-2">
							<span className="font-semibold text-sm text-gray-900 dark:text-white">
								{campaign.user?.name || "Utilisateur"}
							</span>
							<Badge color={statusColors[campaign.status?.value] || "gray"}>
								{campaign.status?.label || "Inconnu"}
							</Badge>
						</div>
						<div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
							<span>{campaign.dates?.time_ago || "Récemment"}</span>
							<span>•</span>
							<span>{campaign.type?.name || `Type ${campaign.type_campaign_id}`}</span>
						</div>
					</div>
				</div>
			</div>

			{/* Contenu principal */}
			<div className="px-4 pb-3">
				<Link
					to={`/campaign/view/${campaign.id}`}
					className="font-semibold text-lg mb-1 text-gray-900 dark:text-white hover:underline"
					onClick={() => handleView(campaign)}
				>
					{campaign.name}
				</Link>
				<p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
					{campaign.description}
				</p>
			</div>

			{/* Image(s) ou affichage sans image */}
			{campaign.images && campaign.images.length > 0 ? (
				<div className="relative bg-black">
					<div className="aspect-square relative overflow-hidden">
						<img
							src={campaign.images[currentImageIndex].url}
							alt={campaign.images[currentImageIndex].alt}
							className="w-full h-full object-cover"
						/>

						{/* Navigation des images */}
						{campaign.images.length > 1 && (
							<>
								<button
									onClick={prevImage}
									className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all"
								>
									<FiChevronLeft size={20} />
								</button>
								<button
									onClick={nextImage}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-all"
								>
									<FiChevronRight size={20} />
								</button>

								{/* Indicateurs de pagination */}
								<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
									{campaign.images.map((_, index) => (
										<button
											key={index}
											onClick={() => setCurrentImageIndex(index)}
											className={`w-2 h-2 rounded-full transition-all ${
												index === currentImageIndex ? "bg-white" : "bg-white/50"
											}`}
										/>
									))}
								</div>

								{/* Compteur d'images */}
								<div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs">
									{currentImageIndex + 1}/{campaign.images.length}
								</div>
							</>
						)}
					</div>
				</div>
			) : (
				// Affichage sans image - style card d'information
				<div className="mx-4 mb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
					<div className="text-center">
						<div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
							<FiImage size={24} className="text-gray-400" />
						</div>
						<h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
							Campagne sans visuel
						</h4>
						<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
							Cette campagne n'a pas encore d'image de couverture
						</p>

						{/* Statistiques en mode compact */}
						<div className="grid grid-cols-3 gap-3">
							<div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
								<div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
									<FiGlobe size={14} />
									<span className="font-semibold text-sm">
										{campaign.social_posts_count || 0}
									</span>
								</div>
								<span className="text-xs text-gray-500 dark:text-gray-400">Posts</span>
							</div>
							<div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
								<div className="flex items-center justify-center gap-1 text-green-600 mb-1">
									<FiFileText size={14} />
									<span className="font-semibold text-sm">
										{campaign.landing_pages_count || 0}
									</span>
								</div>
								<span className="text-xs text-gray-500 dark:text-gray-400">
									Landing
								</span>
							</div>
							<div className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700">
								<div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
									<FiEye size={14} />
									<span className="font-semibold text-sm">
										{formatNumber(campaign.total_views || 0)}
									</span>
								</div>
								<span className="text-xs text-gray-500 dark:text-gray-400">Vues</span>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Actions style Instagram */}
			<div
				className={`px-4 ${campaign.images && campaign.images.length > 0 ? "pt-4 pb-3" : "pb-3"}`}
			>
				<div className="flex items-center justify-between mb-3">
					<div className="flex items-center gap-4">
						<button
							onClick={handleLike}
							disabled={isLiking || !currentUserId}
							className={`transition-all duration-200 hover:scale-110 ${
								isLiking ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							<FiHeart
								size={24}
								className={
									isLiked
										? "text-red-500 fill-current"
										: "text-gray-700 dark:text-gray-300 hover:text-red-500"
								}
							/>
						</button>
						<button
							onClick={handleShare}
							disabled={isSharing || !currentUserId}
							className={`text-gray-700 dark:text-gray-300 hover:text-green-500 transition-colors ${
								isSharing ? "opacity-50 cursor-not-allowed" : ""
							}`}
						>
							<FiShare2 size={24} />
						</button>
					</div>
				</div>

				{/* Compteurs de likes et vues */}
				<div className="mb-2">
					{campaign.total_likes > 0 && (
						<p className="font-semibold text-sm mb-1 text-gray-900 dark:text-white">
							{campaign.total_likes.toLocaleString()} mention
							{campaign.total_likes > 1 ? "s" : ""} "J'aime"
						</p>
					)}
					<div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
						<span className="flex items-center gap-1">
							<FiEye size={12} />
							{(campaign.total_views || 0).toLocaleString()} vues
						</span>
						<span className="flex items-center gap-1">
							<FiShare2 size={12} />
							{campaign.total_shares || 0} partages
						</span>
					</div>
				</div>

				{/* Statistiques détaillées pour campagnes avec images */}
				{campaign.images && campaign.images.length > 0 && (
					<div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mt-3 border border-gray-200 dark:border-gray-700">
						<div className="grid grid-cols-3 gap-3 text-center">
							<div>
								<div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
									<FiGlobe size={14} />
									<span className="font-semibold text-sm">
										{campaign.social_posts_count || 0}
									</span>
								</div>
								<span className="text-xs text-gray-600 dark:text-gray-400">Posts</span>
							</div>
							<div>
								<div className="flex items-center justify-center gap-1 text-green-600 mb-1">
									<FiImage size={14} />
									<span className="font-semibold text-sm">
										{campaign.images_count || 0}
									</span>
								</div>
								<span className="text-xs text-gray-600 dark:text-gray-400">Images</span>
							</div>
							<div>
								<div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
									<FiFileText size={14} />
									<span className="font-semibold text-sm">
										{campaign.landing_pages_count || 0}
									</span>
								</div>
								<span className="text-xs text-gray-600 dark:text-gray-400">
									Landing
								</span>
							</div>
						</div>
					</div>
				)}

				{/* Date de publication */}
				<p className="text-xs text-gray-400 dark:text-gray-500 mt-2 uppercase tracking-wide">
					{campaign.dates?.created_at || "Date inconnue"}
				</p>
			</div>
		</Card>
	);
};

export default CampaignPost;
