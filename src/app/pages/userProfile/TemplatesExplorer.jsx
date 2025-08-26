import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	BsSearch,
	BsFilter,
	BsGrid3X3Gap,
	BsList,
	BsEye,
	BsPlay,
	BsStar,
	BsStarFill,
	BsTag,
	BsCalendar,
	BsPeople,
	BsBarChart,
	BsBullseye,
	BsMegaphone,
	BsShop,
	BsRocket,
	BsDownload,
	BsArrowLeft,
} from "react-icons/bs";
import Button from "@shared/Button";
import { InputForm } from "@shared/Input";
import { useNotification } from "@hooks/useNotification";
import MessageNotification from "@shared/MessageNotification";
import { campaignTemplateService } from "@services/campaignTemplates";
import Pagination from "@shared/Pagination";

const TemplatesExplorer = () => {
	const navigate = useNavigate();
	const { notification, showSuccess, showError, hideNotification } =
		useNotification();

	// États pour la pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [templatesPerPage] = useState(8);

	// États pour les filtres et la recherche
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [selectedType, setSelectedType] = useState("all");
	const [viewMode, setViewMode] = useState("grid");
	const [sortBy, setSortBy] = useState("popular");
	const [showFilters, setShowFilters] = useState(false);

	// États pour les données
	const [templates, setTemplates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filteredTemplates, setFilteredTemplates] = useState([]);

	// États pour les données dynamiques
	const [categories, setCategories] = useState([]);
	const [contentTypes, setContentTypes] = useState([]);
	const [loadingFilters, setLoadingFilters] = useState(true);

	// Mapping des icônes pour les catégories (basé sur le nom)
	const iconComponents = {
		BsShop,
		BsRocket,
		BsPeople,
		BsBullseye,
		BsMegaphone,
		BsTag, // icône fallback
		BsGrid3X3Gap, // icône pour "Tous"
	};

	// Charger les données des filtres (catégories et types) via API
	useEffect(() => {
		const loadFilterData = async () => {
			setLoadingFilters(true);
			try {
				const [categoriesResponse, typesResponse] = await Promise.all([
					campaignTemplateService.getCategories?.() ||
						Promise.resolve({ success: true, data: [] }),
					campaignTemplateService.getTypeCampaigns?.() ||
						Promise.resolve({ success: true, data: [] }),
				]);

				if (categoriesResponse.success && typesResponse.success) {
					const categoriesData = categoriesResponse.data;
					const typesData = typesResponse.data.data;

					// Construire la liste des catégories avec composants icônes
					const categoriesWithIcons = categoriesData.map((cat) => ({
						id: cat.id,
						name: cat.name,
						icon: iconComponents[cat.icon] || BsTag, // Transforme string en composant
						count: 0, // on mettra à jour après chargement des templates
					}));

					// Ajouter "Tous les modèles" au début
					setCategories([
						{ id: "all", name: "Tous les modèles", icon: BsGrid3X3Gap, count: 0 },
						...categoriesWithIcons,
					]);

					// Types de campagne
					const typesFormatted = typesData.map((type) => ({
						id: type.id,
						name: type.name,
					}));

					setContentTypes([{ id: "all", name: "Tous types" }, ...typesFormatted]);
				} else {
					console.error("Erreur lors de la récupération des catégories ou types");
					showError("Erreur lors du chargement des filtres");
				}
			} catch (error) {
				console.error("Error loading filter data:", error);
				showError("Erreur lors du chargement des filtres");
			}
			setLoadingFilters(false);
		};

		loadFilterData();
	}, []);

	// Charger les templates
	useEffect(() => {
		const loadTemplates = async () => {
			setLoading(true);
			try {
				const response = await campaignTemplateService.getCampaignTemplates();
				console.log(response.data);
				if (response.success) {
					const templates = response.data.data;
					// Mettre à jour le compte d'occurrences dans chaque catégorie
					setCategories((prevCategories) => {
						if (!templates.length) return prevCategories;
						return prevCategories.map((cat) => {
							if (cat.id === "all") {
								return { ...cat, count: templates.length };
							}
							const count = templates.filter(
								(t) => t.category === cat.name.toLowerCase()
							).length;
							return { ...cat, count };
						});
					});

					setTemplates(templates);
				} else {
					console.error("Failed to load templates:", response);
					setTemplates([]);
					showError("Erreur lors du chargement des modèles");
				}
			} catch (error) {
				console.error("Error loading templates:", error);
				setTemplates([]);
				showError("Erreur lors du chargement des modèles");
			}
			setLoading(false);
		};
		loadTemplates();
	}, []);

	// Filtrer et trier les modèles
	useEffect(() => {
		let filtered = [...templates];

		// Filtrer par terme de recherche
		if (searchTerm) {
			filtered = filtered.filter(
				(template) =>
					template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(template.tags &&
						template.tags.some((tag) =>
							tag.toLowerCase().includes(searchTerm.toLowerCase())
						)) ||
					template.author.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// Filtrer par catégorie
		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(template) => template.category.name === selectedCategory
			);
		}

		if (selectedType !== "all") {
			filtered = filtered.filter(
				(template) => template.type.id === Number(selectedType)
			);
		}

		// Trier
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "popular":
					return (b.uses || 0) - (a.uses || 0);
				case "recent":
					return new Date(b.createdAt) - new Date(a.createdAt);
				case "rating":
					return (b.rating || 0) - (a.rating || 0);
				default:
					return 0;
			}
		});

		setFilteredTemplates(filtered);
	}, [templates, searchTerm, selectedCategory, selectedType, sortBy]);

	// Calcul des templates à afficher pour la page courante
	const indexOfLastTemplate = currentPage * templatesPerPage;
	const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
	const currentTemplates = filteredTemplates.slice(
		indexOfFirstTemplate,
		indexOfLastTemplate
	);

	// Changer de page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	// Réinitialiser la pagination quand les filtres changent
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedCategory, selectedType, sortBy]);

	// Actions sur les modèles
	const handleUseTemplate = (template) => {
		showSuccess(`Modèle "${template.name}" sélectionné !`);
		navigate(`/campaigns/create?template=${template.id}`);
	};

	const handlePreviewTemplate = (template) => {
		navigate(`/templates/${template.id}/preview`);
	};

	// Fonction pour obtenir les couleurs des types dynamiquement
	const getTypeColor = (type) => {
		// Générer une couleur basée sur le hash du type pour la consistance
		const hash = type.split("").reduce((a, b) => {
			a = (a << 5) - a + b.charCodeAt(0);
			return a & a;
		}, 0);

		const colors = [
			"bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
			"bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
			"bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
			"bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
			"bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
			"bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
			"bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
			"bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
		];

		return colors[Math.abs(hash) % colors.length];
	};

	const renderTemplateCard = (template) => {
		const categoryData = categories.find(
			(cat) => cat.name === template.category.name
		);
		const CategoryIcon = categoryData?.icon || BsTag;

		return (
			<div
				key={template.id}
				className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300 group"
			>
				{/* Thumbnail */}
				<div className="relative h-32 bg-gradient-to-br from-[#4335C4] to-[#6366f1] overflow-hidden">
					{template.thumbnail ? (
						<img
							src={template.thumbnail}
							alt={template.name}
							className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
							onError={(e) => {
								e.target.style.display = "none";
							}}
						/>
					) : (
						<div className="w-full h-full flex items-center justify-center">
							<BsTag className="text-white/60" size={32} />
						</div>
					)}
					<div className="absolute top-3 right-3">
						{template.isPremium && (
							<span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
								PRO
							</span>
						)}
					</div>
					<div className="absolute bottom-3 left-3">
						<span
							className={`text-xs px-2 py-1 rounded-full font-medium ${getTypeColor(template.type.name)}`}
						>
							{template.type.name}
						</span>
					</div>
				</div>

				{/* Contenu */}
				<div className="p-4">
					<div className="flex items-start justify-between mb-2">
						<h3 className="font-semibold text-lg group-hover:text-[#4335C4] transition-colors">
							{template.name}
						</h3>
						<div className="text-[#4335C4]">
							<CategoryIcon size={16} />
						</div>
					</div>

					<p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
						{template.description}
					</p>

					{/* Preview */}
					{template.preview && (
						<div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-3">
							<p className="text-xs text-gray-700 dark:text-gray-300 italic line-clamp-2">
								"{template.preview}"
							</p>
						</div>
					)}

					{/* Stats */}
					<div className="flex items-center gap-4 mb-3 text-sm text-gray-600 dark:text-gray-400">
						<div className="flex items-center gap-1">
							<BsStarFill className="text-yellow-400" size={12} />
							<span>{template.rating || 0}</span>
						</div>
						<div className="flex items-center gap-1">
							<BsDownload size={12} />
							<span>{(template.uses || 0).toLocaleString()} utilisations</span>
						</div>
					</div>

					{/* Author */}
					<div className="mb-3 text-xs text-gray-500 dark:text-gray-500">
						Par {template.author}
					</div>

					{/* Tags */}
					{template.tags && template.tags.length > 0 && (
						<div className="flex flex-wrap gap-1 mb-4">
							{template.tags.slice(0, 3).map((tag, index) => (
								<span
									key={index}
									className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
								>
									#{tag}
								</span>
							))}
							{template.tags.length > 3 && (
								<span className="text-xs text-gray-500">
									+{template.tags.length - 3}
								</span>
							)}
						</div>
					)}

					{/* Actions */}
					<div className="flex gap-2">
						<Button
							onClick={() => handleUseTemplate(template)}
							className="flex-1 text-sm py-2"
						>
							<BsPlay size={14} className="mr-1" />
							Utiliser
						</Button>
						<Button
							variant="outline"
							onClick={() => handlePreviewTemplate(template)}
							className="px-3 py-2"
						>
							<BsEye size={14} />
						</Button>
					</div>
				</div>
			</div>
		);
	};

	const renderTemplateListItem = (template) => {
		const categoryData = categories.find(
			(cat) => cat.name === template.category.name
		);
		const CategoryIcon = categoryData?.icon || BsTag;

		return (
			<div
				key={template.id}
				className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-all duration-300"
			>
				<div className="flex items-center gap-4">
					{/* Thumbnail miniature */}
					<div className="w-16 h-16 bg-gradient-to-br from-[#4335C4] to-[#6366f1] rounded-lg flex-shrink-0 overflow-hidden">
						{template.thumbnail ? (
							<img
								src={template.thumbnail}
								alt={template.name}
								className="w-full h-full object-cover opacity-80"
								onError={(e) => {
									e.target.style.display = "none";
								}}
							/>
						) : (
							<div className="w-full h-full flex items-center justify-center">
								<BsTag className="text-white/60" size={20} />
							</div>
						)}
					</div>

					{/* Contenu principal */}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between mb-2">
							<h3 className="font-semibold text-lg truncate pr-2">{template.name}</h3>
							<div className="flex-shrink-0">
								{template.isPremium && (
									<span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs font-bold px-2 py-1 rounded">
										PRO
									</span>
								)}
							</div>
						</div>

						<p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-1">
							{template.description}
						</p>

						<div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 mb-3">
							<span
								className={`px-2 py-1 rounded ${getTypeColor(template.type.name)}`}
							>
								{template.type.name}
							</span>
							<span className="flex items-center gap-1">
								<BsStarFill className="text-yellow-400" size={10} />
								{template.rating || 0}
							</span>
							<span>{(template.uses || 0).toLocaleString()} utilisations</span>
							<span>Par {template.author}</span>
						</div>

						{/* Tags */}
						{template.tags && template.tags.length > 0 && (
							<div className="flex flex-wrap gap-1">
								{template.tags.map((tag, index) => (
									<span
										key={index}
										className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
									>
										#{tag}
									</span>
								))}
							</div>
						)}
					</div>

					{/* Actions */}
					<div className="flex flex-col gap-2 flex-shrink-0">
						<Button
							onClick={() => handleUseTemplate(template)}
							size="sm"
							className="whitespace-nowrap"
						>
							<BsPlay size={12} className="mr-1" />
							Utiliser
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={() => handlePreviewTemplate(template)}
							className="px-2"
						>
							<BsEye size={12} />
						</Button>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={hideNotification}
				autoHide={true}
				duration={3000}
				position="top-center"
				showProgressBar={true}
			/>

			<div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white transition-colors">
				<div className="container mx-auto py-8 px-4">
					{/* Header avec bouton retour */}
					<div className="flex items-center mb-8">
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
							<h1 className="text-3xl font-bold flex items-center gap-3">
								<BsGrid3X3Gap className="text-[#4335C4]" />
								Explorer les modèles
							</h1>
							<p className="text-gray-600 dark:text-gray-400 mt-2">
								Découvrez nos modèles prédéfinis pour créer des campagnes performantes
								en quelques clics.
							</p>
						</div>
					</div>

					{/* Barre de recherche et filtres */}
					<div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-6">
						<div className="flex flex-col lg:flex-row gap-4">
							{/* Recherche */}
							<div className="flex-1">
								<div className="relative">
									<BsSearch
										className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										size={16}
									/>
									<InputForm
										type="text"
										placeholder="Rechercher un modèle..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>

							{/* Filtres rapides */}
							<div className="flex flex-wrap gap-3 items-center">
								<select
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
									className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4335C4] focus:border-transparent"
									disabled={loadingFilters}
								>
									{loadingFilters ? (
										<option>Chargement...</option>
									) : (
										categories.map((category, index) => (
											<option key={index} value={category.id}>
												{category.name}
											</option>
										))
									)}
								</select>

								<select
									value={selectedType}
									onChange={(e) => setSelectedType(e.target.value)}
									className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4335C4] focus:border-transparent"
									disabled={loadingFilters}
								>
									{loadingFilters ? (
										<option>Chargement...</option>
									) : (
										contentTypes.map((type) => (
											<option key={type.id} value={type.id}>
												{type.name}
											</option>
										))
									)}
								</select>

								<select
									value={sortBy}
									onChange={(e) => setSortBy(e.target.value)}
									className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#4335C4] focus:border-transparent"
								>
									<option value="popular">Plus populaires</option>
									<option value="recent">Plus récents</option>
									<option value="rating">Mieux notés</option>
								</select>

								{/* Toggle vue */}
								<div className="flex border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
									<button
										onClick={() => setViewMode("grid")}
										className={`p-2 ${
											viewMode === "grid"
												? "bg-[#4335C4] text-white"
												: "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"
										} hover:bg-[#4335C4] hover:text-white transition-colors`}
									>
										<BsGrid3X3Gap size={16} />
									</button>
									<button
										onClick={() => setViewMode("list")}
										className={`p-2 ${
											viewMode === "list"
												? "bg-[#4335C4] text-white"
												: "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400"
										} hover:bg-[#4335C4] hover:text-white transition-colors`}
									>
										<BsList size={16} />
									</button>
								</div>
							</div>
						</div>

						{/* Stats des résultats */}
						<div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
							<p className="text-sm text-gray-600 dark:text-gray-400">
								{loading
									? "Chargement..."
									: `Affichage de ${indexOfFirstTemplate + 1}-${Math.min(
											indexOfLastTemplate,
											filteredTemplates.length
										)} sur ${filteredTemplates.length} modèle${filteredTemplates.length > 1 ? "s" : ""}`}
								{searchTerm && ` pour "${searchTerm}"`}
							</p>
						</div>
					</div>

					{/* Liste des modèles */}
					{loading ? (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
								>
									<div className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse" />
									<div className="p-4 space-y-3">
										<div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
										<div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
										<div className="h-3 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-2/3" />
									</div>
								</div>
							))}
						</div>
					) : filteredTemplates.length > 0 ? (
						<>
							<div
								className={
									viewMode === "grid"
										? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
										: "space-y-4"
								}
							>
								{currentTemplates.map((template) =>
									viewMode === "grid"
										? renderTemplateCard(template)
										: renderTemplateListItem(template)
								)}
							</div>

							{/* Composant Pagination */}
							<div className="flex justify-center mt-8">
								<Pagination
									currentPage={currentPage}
									totalItems={filteredTemplates.length}
									itemsPerPage={templatesPerPage}
									onPageChange={paginate}
								/>
							</div>
						</>
					) : (
						<div className="text-center py-12">
							<BsSearch className="mx-auto text-6xl text-gray-300 dark:text-gray-700 mb-4" />
							<h3 className="text-xl font-semibold mb-2">Aucun modèle trouvé</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-6">
								Essayez de modifier vos critères de recherche ou explorez d'autres
								catégories.
							</p>
							<Button
								onClick={() => {
									setSearchTerm("");
									setSelectedCategory("all");
									setSelectedType("all");
								}}
								variant="outline"
							>
								Réinitialiser les filtres
							</Button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default TemplatesExplorer;
