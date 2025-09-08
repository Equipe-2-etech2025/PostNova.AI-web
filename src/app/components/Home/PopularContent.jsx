import React, { useEffect, useState } from "react";
import { campaignService } from "@services/campaignService";
import { BsHeart, BsEye } from "react-icons/bs";

const PopularContent = () => {
	const [campaigns, setCampaigns] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchCampaigns = async () => {
			const result = await campaignService.getPopularCampaigns();
			if (result.success) {
				setCampaigns(result.data);
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

	if (!campaigns || campaigns.length === 0) {
		return (
			<p className="text-center py-20 text-lg">
				Chargement des contenus populaires...
			</p>
		);
	}

	const currentItem = campaigns[currentIndex];

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
							src={currentItem.image_path}
							alt={currentItem.name}
							className="w-full h-full object-cover"
						/>
					</div>
					{/* Partie droite : contenu */}
					<div className="flex-1/2 flex flex-col justify-between gap-10 p-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-r-4xl shadow-2xl transition-all duration-300 ease-in-out">
						{/* Titre et description */}
						<div>
							<h3 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
								{currentItem.name}
							</h3>
							<p className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
								{currentItem.description}
							</p>
							<p className="text-md leading-loose text-gray-700 dark:text-gray-400">
								{currentItem.content}
							</p>
						</div>

						{/* Statistiques (icône + chiffre) */}
						<div className="flex items-center justify-around py-4 px-2">
							{/* Likes */}
							<div className="flex items-center gap-4 text-4xl font-extrabold text-gray-800 dark:text-white">
								<BsHeart className="h-10 w-10 text-red-500" />
								<span>{currentItem.total_likes}</span>
							</div>

							{/* Divider */}
							<div className="h-10 w-[1px] bg-gray-300 dark:bg-gray-600 mx-6" />

							{/* Views */}
							<div className="flex items-center gap-4 text-4xl font-extrabold text-gray-800 dark:text-white">
								<BsEye className="h-10 w-10 text-blue-500" />
								<span>{currentItem.total_views}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PopularContent;
