import React, { useEffect, useState } from "react";
import {
	BsSearch,
	BsFilter,
	BsThreeDotsVertical,
	BsEye,
	BsHeart,
	BsBullseye,
	BsCalendar3,
	BsImage,
	BsFileEarmarkText,
	BsShare,
	BsPencilSquare,
	BsTrash,
	BsChevronLeft,
	BsChevronRight,
	BsPlus,
	BsGrid3X3Gap,
	BsArrowLeft,
	BsList,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@hooks/useAuth";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import { campaignService } from "@services/campaignService";
import LoadingCampaignsState from "@components/allCampaigns/LoadingCampaignsState";

const AllCampaigns = () => {
	const { user, loading: authLoading } = useAuth();
	const navigate = useNavigate();

	// États pour les données
	const [campaigns, setCampaigns] = useState([]);
	const [filteredCampaigns, setFilteredCampaigns] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// États pour les filtres et recherche
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sortBy, setSortBy] = useState("recent");
	const [viewMode, setViewMode] = useState("grid"); // grid ou list

	// États pour la pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;

	// Menu dropdown pour les actions
	const [activeDropdown, setActiveDropdown] = useState(null);

	useEffect(() => {
		// N'appeler fetchCampaigns que si l'authentification est terminée
		if (!authLoading) {
			fetchCampaigns();
		}
	}, [user?.id, authLoading]);

	useEffect(() => {
		filterAndSortCampaigns();
	}, [campaigns, searchTerm, statusFilter, sortBy]);

	const fetchCampaigns = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await campaignService.getCampaignsByUserId(user.id);
			console.log(response.data.data);
			if (response.success) {
				setCampaigns(response.data.data);
			} else {
				setError(response.message || "Erreur lors du chargement des campagnes");
			}
		} catch (error) {
			console.error("Erreur lors du chargement des campagnes:", error);
			setError("Erreur lors du chargement des campagnes");
		} finally {
			setLoading(false);
		}
	};

	const filterAndSortCampaigns = () => {
		let filtered = [...campaigns];

		// Filtrage par recherche
		if (searchTerm) {
			filtered = filtered.filter(
				(campaign) =>
					campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filtrage par statut
		if (statusFilter !== "all") {
			filtered = filtered.filter(
				(campaign) => campaign.status.label === statusFilter
			);
		}

		// Tri
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "recent":
					return new Date(b.dates.updated_at) - new Date(a.dates.updated_at);
				case "oldest":
					return new Date(a.dates.updated_at) - new Date(b.dates.updated_at);
				case "name":
					return a.name.localeCompare(b.name);
				case "views":
					return b.total_views - a.total_views;
				default:
					return 0;
			}
		});

		setFilteredCampaigns(filtered);
		setCurrentPage(1);
	};

	const getStatusBadge = (status) => {
		const statusConfig = {
			active: { label: "Active", class: "bg-green-100 text-green-800" },
			draft: { label: "Brouillon", class: "bg-gray-100 text-gray-800" },
			scheduled: { label: "Programmée", class: "bg-purple-100 text-purple-800" },
			paused: { label: "Pausée", class: "bg-yellow-100 text-yellow-800" },
			completed: { label: "Terminée", class: "bg-purple-100 text-purple-800" },
			created: { label: "Créée", class: "bg-indigo-100 text-indigo-800" },
		};

		const config = statusConfig[status] || statusConfig.draft;
		return (
			<span
				className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}
			>
				{config.label}
			</span>
		);
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("fr-FR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	const formatNumber = (num) => {
		if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
		if (num >= 1000) return (num / 1000).toFixed(1) + "K";
		return num.toString();
	};

	// Fonction pour obtenir l'URL de l'image ou une image par défaut
	const getCampaignImage = (campaign) => {
		if (campaign.images && campaign.images.length > 0) {
			return campaign.images[0].url;
		}
		// Image par défaut si aucune image n'est disponible
		return "https://placehold.co/600x400?text=Aucune+image";
	};

	// Pagination
	const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentCampaigns = filteredCampaigns.slice(startIndex, endIndex);

	const handleDropdownToggle = (e, campaignId) => {
		e.preventDefault();
		e.stopPropagation();
		setActiveDropdown(activeDropdown === campaignId ? null : campaignId);
	};

	const handleCardClick = (campaignId) => {
		navigate(`/campaign/${campaignId}`);
	};

	const handleDeleteCampaign = async (campaignId) => {
		if (window.confirm("Êtes-vous sûr de vouloir supprimer cette campagne ?")) {
			try {
				const response = await campaignService.deleteCampaign(campaignId);
				if (response.success) {
					// Recharger les campagnes après suppression
					fetchCampaigns();
					setActiveDropdown(null);
				} else {
					alert(response.message || "Erreur lors de la suppression");
				}
			} catch (error) {
				console.error("Erreur lors de la suppression:", error);
				alert("Erreur lors de la suppression de la campagne");
			}
		}
	};

	const CampaignCard = ({ campaign }) => (
		<Card styles="overflow-hidden hover:shadow-lg transition-shadow duration-200 cursor-pointer">
			<div className="relative">
				<img
					src={getCampaignImage(campaign)}
					alt={
						campaign.images && campaign.images.length > 0
							? campaign.images[0].alt
							: campaign.name
					}
					className="w-full h-48 object-cover"
					onClick={() => handleCardClick(campaign.id)}
				/>
				<div className="absolute top-3 right-3">
					{getStatusBadge(campaign.status.label)}
				</div>
				<div className="absolute top-3 left-3">
					<div className="relative">
						<button
							onClick={(e) => handleDropdownToggle(e, campaign.id)}
							className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
						>
							<BsThreeDotsVertical size={14} />
						</button>
						{activeDropdown === campaign.id && (
							<div className="absolute top-10 left-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-20 min-w-[150px]">
								<button
									onClick={() => navigate(`/campaign/${campaign.id}`)}
									className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white w-full text-left"
								>
									<BsEye size={14} />
									Voir
								</button>
								<hr className="my-1 border-gray-200 dark:border-gray-600" />
								<button
									onClick={() => handleDeleteCampaign(campaign.id)}
									className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 w-full text-left"
								>
									<BsTrash size={14} />
									Supprimer
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="p-4" onClick={() => handleCardClick(campaign.id)}>
				<div className="flex justify-between items-start mb-2">
					<h3 className="font-semibold text-lg truncate">{campaign.name}</h3>
				</div>

				<p className="text-gray-600 text-sm mb-4 line-clamp-1">
					{campaign.description}
				</p>

				<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
					<span className="flex items-center gap-1">
						<BsCalendar3 size={12} />
						{formatDate(campaign.dates.updated_at)}
					</span>
					<span className="text-xs bg-gray-100 px-2 py-1 rounded">
						{campaign.type?.name || "Non défini"}
					</span>
				</div>

				<div className="grid grid-cols-3 gap-4 mb-4 text-center">
					<div>
						<div className="flex items-center justify-center gap-1 text-purple-600">
							<BsEye size={14} />
							<span className="font-medium">{formatNumber(campaign.total_views)}</span>
						</div>
						<span className="text-xs text-gray-500">Vues</span>
					</div>
					<div>
						<div className="flex items-center justify-center gap-1 text-red-600">
							<BsHeart size={14} />
							<span className="font-medium">{formatNumber(campaign.total_likes)}</span>
						</div>
						<span className="text-xs text-gray-500">Likes</span>
					</div>
					<div>
						<div className="flex items-center justify-center gap-1 text-green-600">
							<BsBullseye size={14} />
							<span className="font-medium">
								{formatNumber(campaign.total_shares)}
							</span>
						</div>
						<span className="text-xs text-gray-500">Partages</span>
					</div>
				</div>

				<div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
					<span className="flex items-center gap-1">
						<BsImage size={12} />
						{campaign.images_count} images
					</span>
					<span className="flex items-center gap-1">
						<BsFileEarmarkText size={12} />
						{campaign.landing_pages_count} LP
					</span>
					<span>{campaign.social_posts_count} posts</span>
				</div>
			</div>
		</Card>
	);

	const CampaignListItem = ({ campaign }) => (
		<Card styles="p-4">
			<div className="flex items-center gap-4">
				<img
					src={getCampaignImage(campaign)}
					alt={
						campaign.images && campaign.images.length > 0
							? campaign.images[0].alt
							: campaign.name
					}
					className="w-16 h-16 object-cover rounded cursor-pointer"
					onClick={() => handleCardClick(campaign.id)}
				/>
				<div
					className="flex-1 min-w-0 cursor-pointer"
					onClick={() => handleCardClick(campaign.id)}
				>
					<div className="flex items-center gap-3 mb-1">
						<h3 className="font-semibold truncate">{campaign.name}</h3>
						{getStatusBadge(campaign.status.label)}
					</div>
					<p className="text-gray-600 text-sm truncate mb-2">
						{campaign.description}
					</p>
					<div className="flex items-center gap-6 text-sm text-gray-500">
						<span className="flex items-center gap-1">
							<BsEye size={12} />
							{formatNumber(campaign.total_views)}
						</span>
						<span className="flex items-center gap-1">
							<BsHeart size={12} />
							{formatNumber(campaign.total_likes)}
						</span>
						<span className="flex items-center gap-1">
							<BsBullseye size={12} />
							{formatNumber(campaign.total_shares)}
						</span>
						<span className="flex items-center gap-1">
							<BsCalendar3 size={12} />
							{formatDate(campaign.dates.updated_at)}
						</span>
						<span className="text-xs bg-gray-100 px-2 py-1 rounded">
							{campaign.type?.name || "Non défini"}
						</span>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => handleCardClick(campaign.id)}
					>
						Voir
					</Button>
					<div className="relative">
						<button
							onClick={(e) => handleDropdownToggle(e, campaign.id)}
							className="p-2 dark:hover:bg-purple-800 hover:bg-gray-100 rounded"
						>
							<BsThreeDotsVertical size={16} />
						</button>
						{activeDropdown === campaign.id && (
							<div className="absolute top-10 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-20 min-w-[150px]">
								<button
									onClick={() => handleDeleteCampaign(campaign.id)}
									className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 w-full text-left"
								>
									<BsTrash size={14} />
									Supprimer
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</Card>
	);

	// Fermer les dropdowns quand on clique ailleurs
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!e.target.closest(".dropdown-container")) {
				setActiveDropdown(null);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	if (loading || authLoading) {
		return <LoadingCampaignsState />;
	}

	if (error) {
		return (
			<div className="container mx-auto my-4">
				<div className="text-center py-8">
					<div className="text-red-500 mb-4">
						<BsFileEarmarkText size={48} className="mx-auto" />
					</div>
					<h3 className="text-xl font-semibold text-red-600 mb-2">
						Erreur de chargement
					</h3>
					<p className="text-gray-500 mb-4">{error}</p>
					<Button onClick={fetchCampaigns}>Réessayer</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto my-4">
			{/* En-tête */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<Button
						variant="outline"
						color="neutral"
						circle
						className="h-12 w-12 mr-4"
						onClick={() => navigate(-1)}
					>
						<BsArrowLeft size={20} />
					</Button>
					<div>
						<h1 className="text-3xl font-bold">Toutes mes campagnes</h1>
						<p className="text-gray-600">
							{filteredCampaigns.length} campagne
							{filteredCampaigns.length > 1 ? "s" : ""} trouvée
							{filteredCampaigns.length > 1 ? "s" : ""}
						</p>
					</div>
				</div>
				<Button as={Link} to={"/campaign/new"} className="pe-2">
					<div className="flex items-center">
						<span>Créer une campagne</span>
						<BsPlus size={24} />
					</div>
				</Button>
			</div>

			{/* Barre de recherche et filtres */}
			<Card styles="p-4">
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="flex-1 relative">
						<BsSearch
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={16}
						/>
						<input
							type="text"
							placeholder="Rechercher une campagne..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						/>
					</div>

					<div className="flex gap-4">
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 dark:bg-gray-800 focus:ring-purple-500"
						>
							<option value="all">Tous les statuts</option>
							<option value="active">Active</option>
							<option value="draft">Brouillon</option>
							<option value="scheduled">Programmée</option>
							<option value="paused">Pausée</option>
							<option value="completed">Terminée</option>
							<option value="created">Créée</option>
						</select>

						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
							className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 dark:bg-gray-800 focus:ring-purple-500"
						>
							<option value="recent">Plus récent</option>
							<option value="oldest">Plus ancien</option>
							<option value="name">Nom (A-Z)</option>
							<option value="views">Plus de vues</option>
						</select>

						<div className="flex  border border-purple-100 dark:border-black-10 rounded-lg overflow-hidden">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 transition-colors ${
									viewMode === "grid"
										? "bg-purple-600 text-white"
										: "text-purple-600 hover:bg-purple-100"
								}`}
							>
								<BsGrid3X3Gap size={16} />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 transition-colors ${
									viewMode === "list"
										? "bg-purple-600 text-white"
										: "text-purple-600 hover:bg-purple-100"
								}`}
							>
								<BsList size={16} />
							</button>
						</div>
					</div>
				</div>
			</Card>
			<div className="mt-6">
				{/* Liste des campagnes */}
				{currentCampaigns.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-gray-400 mb-4">
							<BsFileEarmarkText size={48} className="mx-auto" />
						</div>
						<h3 className="text-xl font-semibold text-gray-600 mb-2">
							Aucune campagne trouvée
						</h3>
						<p className="text-gray-500 mb-4">
							{searchTerm || statusFilter !== "all"
								? "Essayez de modifier vos critères de recherche"
								: "Commencez par créer votre première campagne"}
						</p>
						{!searchTerm && statusFilter === "all" && (
							<Button as={Link} to="/campaign/new">
								Créer ma première campagne
							</Button>
						)}
					</div>
				) : (
					<>
						{viewMode === "grid" ? (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
								{currentCampaigns.map((campaign) => (
									<div key={campaign.id} className="dropdown-container">
										<CampaignCard campaign={campaign} />
									</div>
								))}
							</div>
						) : (
							<div className="space-y-4">
								{currentCampaigns.map((campaign) => (
									<div key={campaign.id} className="dropdown-container">
										<CampaignListItem campaign={campaign} />
									</div>
								))}
							</div>
						)}

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex items-center justify-center gap-2 mt-8">
								<button
									onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
									disabled={currentPage === 1}
									className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-purple-800"
								>
									<BsChevronLeft size={16} />
								</button>

								{Array.from({ length: totalPages }, (_, i) => i + 1)
									.filter((page) => {
										const distance = Math.abs(page - currentPage);
										return (
											distance === 0 || distance === 1 || page === 1 || page === totalPages
										);
									})
									.map((page, index, array) => (
										<React.Fragment key={page}>
											{index > 0 && array[index - 1] !== page - 1 && (
												<span className="px-2 py-1">...</span>
											)}
											<button
												onClick={() => setCurrentPage(page)}
												className={`px-3 py-2 rounded border ${
													currentPage === page
														? "bg-purple-500 text-white border-purple-500"
														: "border-gray-300 hover:bg-gray-100 dark:hover:bg-purple-800"
												}`}
											>
												{page}
											</button>
										</React.Fragment>
									))}

								<button
									onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
									disabled={currentPage === totalPages}
									className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-purple-800"
								>
									<BsChevronRight size={16} />
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AllCampaigns;
