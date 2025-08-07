import React from "react";
import { BsHeart, BsTiktok } from "react-icons/bs";
import Button from "@shared/Button";
import { Card } from "@shared/Card";

const CampaignPostItemSkeleton = () => {
	return (
		<Card shadow="sm">
			<div className="space-y-2">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex items-start justify-start gap-6 font-medium"
				>
					<div className="flex items-center justify-center bg-gray-500/10 rounded-xl p-6">
						<div className="border border-black/50 dark:border-white/50 rounded-full p-2">
							<div className="h-5 w-5 bg-gray-500/50 rounded-full m-0.5"></div>
						</div>
					</div>
					<div className="w-full space-y-4">
						<div className="w-full space-y-3">
							<div className="w-full">
								<div className="h-4 w-1/4 bg-gray-500/10 rounded animate-pulse"></div>
							</div>
							<div className="w-full">
								<div className="h-7 w-1/3 bg-gray-500/10 rounded animate-pulse"></div>
							</div>
						</div>
						<div className="w-full">
							<div className="h-4 w-full bg-gray-500/10 rounded animate-pulse"></div>
						</div>
					</div>
				</Button>
			</div>
		</Card>
	);
};

const CampaignPostItem = ({ campaignPost, isLoading = true, onClick }) => {
	if (!campaignPost) return null;
	if (isLoading) {
		return <CampaignPostItemSkeleton campaignPost={campaignPost} />;
	}

	return (
		<Card shadow="sm">
			<div className="space-y-2">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex items-start justify-start gap-6 font-medium"
					onClick={onClick}
				>
					<div className="flex items-center justify-center bg-gray-500/10 rounded-xl p-6">
						<BsTiktok
							size={40}
							className="border border-black/50 dark:border-white/50 rounded-full p-2"
						/>
					</div>
					<div className="space-y-1 text-start">
						<div>
							<span className="text-sm text-gray-500">
								{new Date(campaignPost.created_at).toDateString()}
							</span>
							<h4 className="text-2xl font-bold">{campaignPost.social}</h4>
						</div>
						<p className="leading-relaxed line-clamp-1">{campaignPost.content}</p>
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

export default CampaignPostItem;
