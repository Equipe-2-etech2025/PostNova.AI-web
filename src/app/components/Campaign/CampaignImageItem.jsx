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

const CampaignImageItem = ({ campaignImage, isLoading = true, onClick }) => {
	if (!campaignImage) return null;
	if (isLoading) {
		return <CampaignImageItemSkeleton />;
	}

	return (
		<Card shadow="sm">
			<div className="space-y-2">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex flex-col items-center justify-center"
					onClick={onClick}
				>
					<div className="w-full flex items-center justify-center bg-gray-500/10 rounded-xl overflow-hidden">
						<img
							src={galaxy}
							alt={campaignImage.altText}
							className="size-full object-cover"
						/>
					</div>
					<div className="w-full space-y-1 text-start mt-2">
						<span className="font-normal">
							{campaignImage.created_at
								? new Date(campaignImage.created_at).toDateString()
								: "Date non disponible"}
						</span>
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
