import React from "react";
import { Link } from "react-router";
import Button from "@shared/Button";

const TABS = [
	{ name: "Vue d'ensemble", link: "" },
	{ name: "Publications", link: "#posts" },
	{ name: "Images", link: "#images" },
	{ name: "Landing page", link: "#landing-page" }
];

const CampaignTabs = ({ activeTab, setActiveTab }) => {
	return (
		<div className="flex items-end text-center border-b-2 border-b-gray-500/10">
			{TABS.map((tab, id) => (
				<Button
					key={id}
					variant="ghost"
					as={Link}
					to={tab.link}
					color="tertiary"
					className={`bg-gray-500/10 rounded-b-none px-6 pb-1 hover:bg-gray-500/10 -mb-0.5 border-b-2 transition-all duration-300 ${
						activeTab === id
							? "bg-gray-500 border-b-purple-600"
							: "bg-transparent border-b-transparent"
					}`}
					onClick={() => setActiveTab(id)}
				>
					<span>{tab.name}</span>
				</Button>
			))}
		</div>
	);
};

export default CampaignTabs;