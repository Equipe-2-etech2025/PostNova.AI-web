import React from "react";
import { BsHeart } from "react-icons/bs";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import galaxy from "@assets/galaxy.png";

const CampaignImageItemSkeleton = () => {
	return (
		<Card shadow="sm">
			<div className="space-y-4">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex flex-col items-center justify-center gap-1"
				>
					<div className="w-full flex items-center justify-center bg-gray-500/10 rounded-xl overflow-hidden">
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
			<Card shadow="sm">
				<div className="space-y-2">
					<div className="w-full bg-gray-200 rounded-xl animate-pulse h-48"></div>
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
		<Card shadow="sm">
			<div className="space-y-2">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex flex-col items-center justify-center p-0"
					onClick={onClick}
				>
					<div className="relative w-full aspect-square overflow-hidden rounded-xl">
						<img
							src={campaignImage.path}
							alt={`Image ${campaignImage.id}`}
							className="w-full h-full object-cover hover:scale-105 transition-transform"
							onError={(e) => {
								e.target.src = "/placeholder-image.jpg";
								e.target.className = "w-full h-full object-contain bg-gray-100 p-4";
							}}
						/>
						{campaignImage.is_published && (
							<span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
								Publiée
							</span>
						)}
						{!campaignImage.is_published && (
							<span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
								Non publiée
							</span>
						)}
					</div>
					<div className="w-full space-y-1 text-start mt-2">
						<span className="text-sm text-gray-500">
							<p className="text-sm text-gray-500">
								{campaignImage.formattedDate ||
									(campaignImage.created_at
										? formatDate(campaignImage.created_at)
										: "Date inconnue")}
							</p>
						</span>

						{campaignImage.social && (
							<div className="flex justify-end">
								<span className="text-xs bg-gray-100 px-2 py-1 rounded">
									{campaignImage.social}
								</span>
							</div>
						)}
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

export default CampaignImageItem;
