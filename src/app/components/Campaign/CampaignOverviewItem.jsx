import React from "react";
import { Card } from "@shared/Card";
import Button from "@shared/Button";
import { BsHeart, BsTiktok } from "react-icons/bs";

const CampaignOverviewItemSkeleton = () => {
	return (
		<Card shadow="sm">
			<div className="space-y-4">
				<div className="w-full flex flex-col items-start gap-4 font-medium">
					<div className="w-full">
						<div className="h-4 w-1/4 bg-gray-500/10 rounded animate-pulse"></div>
					</div>
					<div className="h-5 w-full bg-gray-500/10 rounded animate-pulse"></div>
				</div>
				<div className="flex items-center justify-between gap-2 mt-3">
					<ul>
						<li className="inline-block mr-2">
							<span className="flex items-center justify-center border border-gray-500/10 px-2 py-2 rounded-full text-sm">
								<span className="bg-gray-500/10 w-4 h-4 inline-block rounded-full animate-pulse"></span>
							</span>
						</li>
						<li className="inline-block mr-2">
							<span className="flex items-center justify-center border border-gray-500/10 px-2 py-2 rounded-full text-sm">
								<span className="bg-gray-500/10 w-4 h-4 inline-block rounded-full animate-pulse"></span>
							</span>
						</li>
						<li className="inline-block mr-2">
							<span className="flex items-center justify-center border border-gray-500/10 px-2 py-2 rounded-full text-sm">
								<span className="bg-gray-500/10 w-4 h-4 inline-block rounded-full animate-pulse"></span>
							</span>
						</li>
					</ul>
					<div className="flex items-center gap-2"></div>
				</div>
			</div>
		</Card>
	);
};

const CampaignOverviewItem = ({ campaignOverview, isLoading = true, onClick }) => {
	if (!campaignOverview) return null;
	if (isLoading) {
		return <CampaignOverviewItemSkeleton />;
	}
	return (
		<Card shadow="sm">
			<div className="space-y-2">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex flex-col items-start gap-2 font-medium"
					onClick={onClick}
				>
					<div>
						<span className="text-sm text-gray-500">
							{new Date(campaignOverview.created_at).toDateString()}
						</span>
					</div>
					<p className="leading-relaxed">{campaignOverview.prompt}</p>
				</Button>
				<div className="flex items-center justify-between gap-2 mt-2">
					<ul>
						{campaignOverview.tags.map((tag, index) => (
							<li key={index} className="inline-block mr-2">
								<span className="flex items-center justify-center border border-gray-500/10 px-2 py-2 rounded-full text-sm">
									<BsTiktok className="bg-gray-500/10 w-4 h-4 inline-block rounded-full" />
								</span>
							</li>
						))}
					</ul>
					<div className="flex items-center gap-2">
						<div className="w-full">
							<div className="table ml-auto">
								<Button variant="ghost" className="flex items-center gap-2">
									<span>0</span>
									<BsHeart size={18} />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default CampaignOverviewItem;
