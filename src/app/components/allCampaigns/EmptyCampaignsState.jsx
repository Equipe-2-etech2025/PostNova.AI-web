import React from "react";
import { FiSearch } from "react-icons/fi";
import Button from "@shared/Button";

const EmptyCampaignsState = ({ clearFilters }) => {
	return (
		<div className="text-center py-12">
			<div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
				<FiSearch size={32} className="text-gray-400 dark:text-gray-500" />
			</div>
			<h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
				Aucune campagne trouvée
			</h3>
			<p className="text-gray-500 dark:text-gray-400 mb-4">
				Essayez de modifier vos critères de recherche
			</p>
			<Button onClick={clearFilters}>Réinitialiser les filtres</Button>
		</div>
	);
};

export default EmptyCampaignsState;
