import React from "react";
import { BsArrowUpRightCircleFill, BsClock, BsPlus } from "react-icons/bs";
import CampaignItem from "@components/Dashboard/CampaignItem";
import SectionBlock from "@components/Dashboard/SectionBlock";
import Button from "@shared/Button";

const LastCampaignList = ({ campaigns = [], isLoading = true }) => {
	return (
		<SectionBlock
			title={"Campagnes récentes"}
			icon={<BsClock />}
			action={
				!isLoading &&
				campaigns.length > 1 && (
					<Button circle>
						<div className="flex items-center gap-2 px-2">
							<span className="text-sm">Voir tout</span>
							<BsArrowUpRightCircleFill size={16} />
						</div>
					</Button>
				)
			}
		>
			{isLoading ? (
				<div className="flex items-center justify-center h-48">
					<p className="text-gray-500">Chargement des campagnes...</p>
				</div>
			) : campaigns.length > 0 ? (
				campaigns.map((campaign) => (
					<CampaignItem
						key={campaign.id}
						id={campaign.id}
						name={campaign.name}
						status={campaign.status}
						createdAt={campaign.createdAt}
						videoNumber={campaign.videoNumber}
						imageNumber={campaign.imageNumber}
						landingPageNumber={campaign.landingPageNumber}
						views={campaign.views}
						likes={campaign.likes}
						share={campaign.share}
					/>
				))
			) : (
				<div className="text-center text-gray-500 space-y-2 my-4">
					<p>Aucune campagne trouvée.</p>
					<Button color="blue">
						<div className="flex items-center gap-4 text-white">
							<BsPlus size={24} />
							<span>Créer une campagne</span>
						</div>
					</Button>
				</div>
			)}
		</SectionBlock>
	);
};

export default LastCampaignList;
