import React, { useEffect, useState } from "react";
import { campaignService } from "@services/campaignService";
import { BsHeart, BsEye } from "react-icons/bs";

const PopularContent = () => {
	const [campaigns, setCampaigns] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchCampaigns = async () => {
			try {
				setIsLoading(true);
				const result = await campaignService.getPopularCampaigns();
				if (result.success) {
					setCampaigns(result.data || [])
				} else {
					setCampaigns([]);
				}
			} catch (error) {
				console.error("Error fetching popular campaigns:", error);
				setCampaigns([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCampaigns();
	}, []);

	useEffect(() => {
		if (!campaigns || campaigns.length === 0) return;
		
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
		}, 2000);
		return () => clearInterval(interval);
	}, [campaigns]);

	if (isLoading) {
		return (
			<p className="text-center py-20 text-lg">
				Chargement des contenus populaires...
			</p>
		);
	}

	if (!campaigns || campaigns.length === 0) {
		return (
			<p className="text-center py-20 text-lg">
				Aucun contenu populaire pour le moment.
			</p>
		);
	}

	const currentItem = campaigns[currentIndex];

	if (!currentItem) {
		return (
			<p className="text-center py-20 text-lg">
				Erreur d'affichage du contenu.
			</p>
		);
	}

	return (
		<section id="popular-content" className="py-32">
			<div className="container mx-auto">
				<div className="text-center mb-4">
					<h2 className="text-5xl font-bold mb-4">Contenus Populaires</h2>
					<p className="text-lg text-[var(--color-lightgray)] mb-12">
						Plongez dans les tendances actuelles et découvrez le contenu qui fait le
						buzz.
					</p>
				</div>
				<div className="bg-gray-50 dark:bg-black/50 flex rounded-4xl shadow-lg overflow-hidden transition-all duration-700">
					{/* Partie gauche : fond coloré */}
					<div className="flex-1/2 transition-all">
						<img
							src={currentItem.image_path || "/placeholder-image.jpg"}
							alt={currentItem.name || "Contenu populaire"}
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Partie droite : contenu */}
					<div className="flex-1/2 flex flex-col justify-between gap-10 p-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-r-4xl shadow-2xl transition-all duration-300 ease-in-out">
						{/* Titre et description */}
						<div>
							<h3 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
								{currentItem.name || "Sans titre"}
							</h3>
							<p className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
								{currentItem.description || "Aucune description disponible"}
							</p>
							<p className="text-md leading-loose text-gray-700 dark:text-gray-400">
								{currentItem.content || "Contenu non disponible"}
							</p>
						</div>

						{/* Statistiques (icône + chiffre) */}
						<div className="flex items-center justify-around py-4 px-2">
							{/* Likes */}
							<div className="flex items-center gap-4 text-4xl font-extrabold text-gray-800 dark:text-white">
								<BsHeart className="h-10 w-10 text-red-500" />
								<span>{currentItem.total_likes || 0}</span>
							</div>

							{/* Divider */}
							<div className="h-10 w-[1px] bg-gray-300 dark:bg-gray-600 mx-6" />

							{/* Views */}
							<div className="flex items-center gap-4 text-4xl font-extrabold text-gray-800 dark:text-white">
								<BsEye className="h-10 w-10 text-blue-500" />
								<span>{currentItem.total_views || 0}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PopularContent;