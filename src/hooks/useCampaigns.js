import { useState, useEffect, useMemo } from "react";
import { campaignService } from "@services/campaignService";
import { TypeCampaignService } from "@services/typeCampaignService";
import { campaignInteractionService } from "@services/campaignInteractionService";
import useAuth from "@hooks/useAuth";

export const useCampaigns = () => {
	const [campaigns, setCampaigns] = useState([]);
	const [typeCampaigns, setTypeCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);
	const [loadingTypes, setLoadingTypes] = useState(true);
	const [likedCampaigns, setLikedCampaigns] = useState(new Set());
	const [sharedCampaigns, setSharedCampaigns] = useState(new Set());

	const { user } = useAuth();
	const currentUserId = user?.id;

	// Chargement des campagnes et des types
	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);
				setLoadingTypes(true);

				// Charger les campagnes
				const campaignsResult = await campaignService.getAllCampaigns();
				if (campaignsResult.success) {
					setCampaigns(campaignsResult.data.data);
				}

				// Charger les types de campagnes
				const typesResult = await TypeCampaignService.getAllTypeCampaign();
				if (typesResult.success) {
					setTypeCampaigns(typesResult.data.data);
				}
			} catch (error) {
				console.error("Erreur lors du chargement des données:", error);
			} finally {
				setLoading(false);
				setLoadingTypes(false);
			}
		};

		loadData();
	}, []);

	// Fonction pour gérer les likes
	const handleLike = async (campaignId, interactionData) => {
		try {
			if (!campaignId || !currentUserId) {
				throw new Error("ID campagne ou utilisateur manquant");
			}

			const campaign = campaigns.find((c) => c.id === campaignId);
			const isCurrentlyLiked =
				likedCampaigns.has(campaignId) || campaign?.user_has_liked;

			let result;

			if (isCurrentlyLiked) {
				result = await campaignInteractionService.dislike(
					campaignId,
					currentUserId
				);
			} else {
				result = await campaignInteractionService.createInteraction(interactionData);
			}

			if (result.success) {
				setCampaigns((prev) =>
					prev.map((campaign) =>
						campaign.id === campaignId
							? {
									...campaign,
									total_likes: isCurrentlyLiked
										? Math.max(0, (campaign.total_likes || 0) - 1)
										: (campaign.total_likes || 0) + 1,
									user_has_liked: !isCurrentlyLiked,
								}
							: campaign
					)
				);

				setLikedCampaigns((prev) => {
					const newSet = new Set(prev);
					isCurrentlyLiked ? newSet.delete(campaignId) : newSet.add(campaignId);
					return newSet;
				});
			}
		} catch (error) {
			console.error("Erreur lors de l'opération like/dislike:", error);
		}
	};

	// Fonction pour gérer les partages
	const handleShare = async (campaignId, interactionData) => {
		try {
			if (!campaignId || !currentUserId) {
				throw new Error("ID campagne ou utilisateur manquant");
			}

			const result = await campaignInteractionService.createInteraction(interactionData);

			if (result.success) {
				setCampaigns((prev) =>
					prev.map((campaign) =>
						campaign.id === campaignId
							? {
									...campaign,
									total_shares: (campaign.total_shares || 0) + 1,
								}
							: campaign
					)
				);
			}
		} catch (error) {
			console.error("Erreur lors du partage:", error);
		}
	};

	// Fonction pour gérer les bookmarks
	const handleBookmark = (campaignId) => {
		console.log("Bookmark campaign:", campaignId);
		// À implémenter avec votre API
	};

	// Options pour les types basées sur les données réelles
	const typeOptions = useMemo(() => {
		return typeCampaigns.map((type) => ({
			value: type.id.toString(),
			label: type.name,
		}));
	}, [typeCampaigns]);

	return {
		campaigns,
		setCampaigns,
		typeCampaigns,
		loading,
		loadingTypes,
		likedCampaigns,
		sharedCampaigns,
		currentUserId,
		handleLike,
		handleShare,
		handleBookmark,
		typeOptions,
	};
};