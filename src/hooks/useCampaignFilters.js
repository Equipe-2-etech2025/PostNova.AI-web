import { useState, useMemo } from "react";

export const useCampaignFilters = (campaigns, itemsPerPage = 6) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedStatus, setSelectedStatus] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [sortBy, setSortBy] = useState("recent");
	const [currentPage, setCurrentPage] = useState(1);
	const [showFilters, setShowFilters] = useState(false);

	// Filtrage et tri des campagnes
	const filteredAndSortedCampaigns = useMemo(() => {
		let filtered = campaigns.filter((campaign) => {
			const matchesSearch =
				campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus =
				!selectedStatus || campaign.status.value.toString() === selectedStatus;
			const matchesType =
				!selectedType || campaign.type_campaign_id.toString() === selectedType;
			return matchesSearch && matchesStatus && matchesType;
		});

		// Tri
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "name":
					return a.name.localeCompare(b.name);
				case "likes":
					return (b.total_likes || 0) - (a.total_likes || 0);
				case "views":
					return (b.total_views || 0) - (a.total_views || 0);
				case "engagement":
					return (
						(b.total_likes || 0) +
						(b.total_shares || 0) -
						((a.total_likes || 0) + (a.total_shares || 0))
					);
				case "recent":
				default:
					return (
						new Date(b.dates?.created_at || 0) - new Date(a.dates?.created_at || 0)
					);
			}
		});

		return filtered;
	}, [campaigns, searchTerm, selectedStatus, selectedType, sortBy]);

	// Pagination
	const totalPages = Math.ceil(filteredAndSortedCampaigns.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const paginatedCampaigns = filteredAndSortedCampaigns.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// Fonction pour effacer les filtres
	const clearFilters = () => {
		setSearchTerm("");
		setSelectedStatus("");
		setSelectedType("");
		setSortBy("recent");
		setCurrentPage(1);
	};

	// Reset page when filters change
	const resetPage = () => {
		setCurrentPage(1);
	};

	return {
		// States
		searchTerm,
		setSearchTerm,
		selectedStatus,
		setSelectedStatus,
		selectedType,
		setSelectedType,
		sortBy,
		setSortBy,
		currentPage,
		setCurrentPage,
		showFilters,
		setShowFilters,
		
		// Computed values
		filteredAndSortedCampaigns,
		paginatedCampaigns,
		totalPages,
		
		// Functions
		clearFilters,
		resetPage,
	};
};