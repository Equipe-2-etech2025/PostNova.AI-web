import React from "react";
import { Card } from "@shared/Card";
import Button from "@shared/Button";

const CampaignLandingPageItem = ({ campaignLandingPage , isLoading = true, onClick }) => {
	if (!campaignLandingPage) return null;
	if (isLoading) {
		return null;
	}
	
	return (
		<Card shadow="md">
			<div className="space-y-2">
				<Button
					variant="ghost"
					size="none"
					className="w-full flex items-start justify-start gap-6 font-medium"
					onClick={onClick}
				>
					<div className="space-y-1 text-start">
						<div>
							<span className="text-sm text-gray-500">
								{new Date(campaignLandingPage.created_at).toDateString()}
							</span>
							<h4 className="text-2xl font-bold">{campaignLandingPage.content.template.data.hero.title}</h4>
						</div>
					</div>
				</Button>
			</div>
		</Card>
	);
};

export default CampaignLandingPageItem;
