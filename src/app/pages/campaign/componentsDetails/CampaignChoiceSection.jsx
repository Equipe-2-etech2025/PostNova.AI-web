import React from "react";
import { BsCardImage, BsFileText, BsGlobe, BsPlusSquareFill } from "react-icons/bs";
import { CardChoice } from "./CardChoice";

const CampaignChoiceSection = ({
	onImageClick,
	onPostClick,
	onLandingPageClick,
}) => {
	return (
		<section className="py-6">
			<h2 className="text-xl font-semibold text-center mb-4">
				Quel type de contenu voulez-vous créer ?
			</h2>
			<p className="text-gray-500 text-center mb-6">
				Choisissez le format qui correspond le mieux à vos objectifs
			</p>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				{/* Carte Image Marketing */}
				<CardChoice
					hoverAnimation
					className="text-center shadow-lg group hover:border-blue-500"
					onClick={onImageClick}
				>
					<div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-blue-500 text-white mb-3 group-hover:bg-blue-600 transition-all duration-300">
						<BsCardImage size={24} />
					</div>
					<h3 className="font-semibold text-lg mb-2">Image Marketing</h3>
					<p className="text-gray-500 text-sm">
						Créez des images percutantes pour vos réseaux sociaux
					</p>
				</CardChoice>

				{/* Carte Post Réseaux Sociaux */}
				<CardChoice
					hoverAnimation
					className="text-center shadow-lg group hover:border-green-500"
					onClick={onPostClick}
				>
					<div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-500 text-white mb-3 group-hover:bg-green-600 transition-all duration-300">
						<BsFileText size={24} />
					</div>
					<h3 className="font-semibold text-lg mb-2">Post Réseaux Sociaux</h3>
					<p className="text-gray-500 text-sm">
						Générez du contenu optimisé pour vos publications
					</p>
				</CardChoice>

				{/* Carte Landing Page */}
				<CardChoice
					hoverAnimation
					className="text-center shadow-lg group hover:border-purple-500"
					onClick={onLandingPageClick}
				>
					<div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-purple-500 text-white mb-3 group-hover:bg-purple-600 transition-all duration-300">
						<BsGlobe size={24} />
					</div>
					<h3 className="font-semibold text-lg mb-2">Landing Page</h3>
					<p className="text-gray-500 text-sm">
						Construisez des pages de conversion performantes
					</p>
				</CardChoice>
				{/* Carte Image Marketing */}
				<CardChoice
					hoverAnimation
					className="text-center shadow-lg group hover:border-yellow-500"
					onClick={onImageClick}
				>
					<div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 text-white mb-3 group-hover:bg-yellow-600 transition-all duration-300">
						<BsPlusSquareFill size={24} />
					</div>
					<h3 className="font-semibold text-lg mb-2">Campagne complète</h3>
					<p className="text-gray-500 text-sm">
						Créez des posts réseaux, images et landing pages en une clique.
					</p>
				</CardChoice>
			</div>
		</section>
	);
};

export default CampaignChoiceSection;
