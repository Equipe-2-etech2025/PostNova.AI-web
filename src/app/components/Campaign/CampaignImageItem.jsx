import React from "react";
import { BsHeart } from "react-icons/bs";
import Button from "@shared/Button";
import { CardImage } from "@shared/CardImage";
import { Card } from "@shared/Card";

const formatDate = (dateString) => {
	if (!dateString) return "Date inconnue";
	const options = {
		day: "numeric",
		month: "short",
		year: "numeric",
	};
	return new Date(dateString).toLocaleDateString("fr-FR", options);
};

const CampaignImageItemSkeleton = () => {
	return (
		<Card shadow="sm" className="overflow-hidden">
			<div className="space-y-4">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex flex-col items-center justify-center gap-1"
				>
					<div className="w-full flex items-center justify-center bg-gray-500/10 rounded-t-xl overflow-hidden">
						<div className="size-full flex items-center justify-center bg-gray-500/5 p-16 animate-pulse">
							<div className="border border-gray-500/10 rounded-full p-4">
								<div className="h-5 w-5 bg-gray-500/10 rounded-full animate-pulse"></div>
							</div>
						</div>
					</div>
					<div className="w-full space-y-1 text-start mt-2">
						<div className="h-4 w-1/2 bg-gray-500/10 rounded" />
					</div>
				</Button>
				<div className="w-full">
					<div className="table ml-auto">
						<Button variant="ghost" className="flex items-center gap-2">
							<span>0</span>
							<BsHeart size={18} />
						</Button>
					</div>
				</div>
			</div>
		</Card>
	);
};

const CampaignImageItem = ({ campaignImage, isLoading = false, onClick }) => {
	if (!campaignImage) return null;

	if (isLoading) {
		return (
			<Card shadow="sm" className="overflow-hidden">
				<div className="space-y-2">
					<div className="w-full bg-gray-200 rounded-t-xl animate-pulse h-48"></div>
					<div className="w-full space-y-1">
						<div className="h-4 bg-gray-200 rounded animate-pulse"></div>
					</div>
					<div className="w-full">
						<div className="h-6 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
					</div>
				</div>
			</Card>
		);
	}

	return (
		<CardImage shadow="lg" className="overflow-hidden  rounded-t-xl rounded-b-none">
			<div className="relative">
				{/* Image en plein écran */}
				<Button
					variant="ghost"
					size="none"
					className="w-full flex flex-col items-center justify-center p-0 relative"
					onClick={onClick}
				>
					{/* Conteneur d'image avec coins arrondis seulement en haut */}
					<div className="relative w-full aspect-square overflow-hidden rounded-t-xl p-0">
						<img
							src={campaignImage.path}
							alt={`Image ${campaignImage.id}`}
							className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
							onError={(e) => {
								e.target.src = "/placeholder-image.jpg";
								e.target.className = "w-full h-full object-contain bg-gray-100 p-4";
							}}
						/>
					</div>

					{/* Overlay réduit avec disposition en row */}
					<div
						className="absolute bottom-0 left-0 right-0 
                    bg-gradient-to-t from-black/80 via-black/50 to-transparent 
                    p-3 backdrop-blur-sm h-16"
					>
						<div className="flex justify-between items-center h-full">
							{/* Date */}
							<div className="text-white flex-1">
								<p className="text-sm font-medium truncate">
									{campaignImage.formattedDate ||
										(campaignImage.created_at
											? formatDate(campaignImage.created_at)
											: "Date inconnue")}
								</p>

								{/* Plateforme sociale */}
								{campaignImage.social && (
									<span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm mt-1 inline-block">
										{campaignImage.social}
									</span>
								)}
							</div>
						</div>
					</div>
				</Button>
			</div>
		</CardImage>
	);
};

export default CampaignImageItem;
