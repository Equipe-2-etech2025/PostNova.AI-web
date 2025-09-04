import React from "react";
import { BsArrowUpRightCircleFill, BsClock, BsPlus } from "react-icons/bs";
import CampaignItem from "@components/Dashboard/CampaignItem";
import SectionBlock from "@layouts/SectionBlock";
import Button from "@shared/Button";
import { Link } from "react-router";

const LastCampaignList = ({ campaigns = [], isLoading = true }) => {
	return (
		<SectionBlock
			title={"Campagnes récentes"}
			icon={<BsClock />}
			action={
				!isLoading &&
				campaigns.length > 1 && (
					<Link to="/campaign/list">
						<Button circle>
							<div className="flex items-center gap-2 px-2">
								<span className="text-sm">Voir tout</span>
								<BsArrowUpRightCircleFill size={16} />
							</div>
						</Button>
					</Link>
				)
			}
		>
			{isLoading ? (
				<div className="flex items-center justify-center h-48">
					<p className="text-gray-500">Chargement des campagnes...</p>
				</div>
			) : campaigns.length > 0 ? (
				<div className="space-y-2">
					{campaigns.map((campaign) => (
						<CampaignItem
							key={campaign.id}
							id={campaign.id}
							name={campaign.name}
							status={campaign.status.label}
							createdAt={campaign.dates.created_at}
							publicationNumber={campaign.social_posts_count}
							imageNumber={campaign.images_count}
							landingPageNumber={campaign.landing_pages_count}
							views={campaign.total_views}
							likes={campaign.total_likes}
							share={campaign.total_shares}
						/>
					))}
				</div>
			) : (
				<div className="text-center text-gray-500 space-y-2 my-4">
					<p>Aucune campagne trouvée.</p>
					<Link to="/campaign/new">
						<Button color="blue">
							<div className="flex items-center gap-4 text-white">
								<BsPlus size={24} />
								<span>Créer une campagne</span>
							</div>
						</Button>
					</Link>
				</div>
			)}
		</SectionBlock>
	);
};

export default LastCampaignList;
