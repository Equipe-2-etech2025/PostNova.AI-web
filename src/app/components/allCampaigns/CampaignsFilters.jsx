import React from "react";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";
import Button from "@shared/Button";

const CampaignsFilters = ({
	showFilters,
	setShowFilters,
	searchTerm,
	setSearchTerm,
	selectedStatus,
	setSelectedStatus,
	selectedType,
	setSelectedType,
	sortBy,
	setSortBy,
	typeOptions,
	clearFilters,
}) => {
	const statusOptions = [
		{ value: "1", label: "Créée" },
		{ value: "2", label: "Active" },
		{ value: "3", label: "En pause" },
		{ value: "4", label: "Terminée" },
		{ value: "5", label: "Annulée" },
	];

	return (
		<>
			{/* Header fixe */}
			<div className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
				<div className="max-w-2xl mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
							Campagnes
						</h1>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setShowFilters(!showFilters)}
							className="dark:text-gray-300 dark:hover:bg-gray-800"
						>
							<FiFilter size={16} />
						</Button>
					</div>

					{/* Barre de recherche */}
					<div className="relative mt-4">
						<FiSearch
							className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={16}
						/>
						<input
							type="text"
							placeholder="Rechercher une campagne..."
							className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-full focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
			</div>

			{/* Filtres déroulants */}
			{showFilters && (
				<div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
					<div className="max-w-2xl mx-auto px-4 py-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
							<select
								className="p-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
								value={selectedStatus}
								onChange={(e) => setSelectedStatus(e.target.value)}
							>
								<option value="">Tous les statuts</option>
								{statusOptions.map((status) => (
									<option key={status.value} value={status.value}>
										{status.label}
									</option>
								))}
							</select>

							<select
								className="p-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
								value={selectedType}
								onChange={(e) => setSelectedType(e.target.value)}
							>
								<option value="">Tous les types</option>
								{typeOptions.map((type) => (
									<option key={type.value} value={type.value}>
										{type.label}
									</option>
								))}
							</select>

							<select
								className="p-2 bg-gray-100 dark:bg-gray-800 border-0 rounded-lg focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
							>
								<option value="recent">Plus récent</option>
								<option value="likes">Plus aimé</option>
								<option value="views">Plus vu</option>
								<option value="engagement">Plus d'engagement</option>
								<option value="name">Nom (A-Z)</option>
							</select>
						</div>

						{/* Bouton pour effacer les filtres */}
						{(searchTerm || selectedStatus || selectedType) && (
							<div className="flex justify-center mt-4">
								<Button variant="secondary" size="sm" onClick={clearFilters}>
									<FiX size={14} />
									Effacer les filtres
								</Button>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CampaignsFilters;
