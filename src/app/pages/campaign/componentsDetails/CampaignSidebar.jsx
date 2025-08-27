import React from "react";
import { BsBarChartLine, BsPieChart, BsTiktok, BsTwitterX, BsLinkedin } from "react-icons/bs";
import SectionBlock from "@layouts/SectionBlock";
import Button from "@shared/Button";

const CampaignSidebar = ({ posts, stats, loadingStats, quotaPrompt, tarif, loadingQuota }) => {
	const getSocialLink = (socialId) => {
		const links = {
			1: "https://www.tiktok.com",
			2: "https://twitter.com",
			3: "https://www.linkedin.com"
		};
		return links[socialId] || "#";
	};

	const getSocialIcon = (socialId) => {
		switch (socialId) {
			case 1: return <BsTiktok size={20} />;
			case 2: return <BsTwitterX size={20} />;
			case 3: return <BsLinkedin size={20} />;
			default: return null;
		}
	};

	return (
		<aside className="flex-1/4 space-y-4">
			<SectionBlock title="Activités de la campagne" icon={<BsBarChartLine />}>
				<SocialNetworks 
					posts={posts} 
					getSocialLink={getSocialLink} 
					getSocialIcon={getSocialIcon} 
				/>
				<CampaignStats stats={stats} loading={loadingStats} />
			</SectionBlock>
			
			<QuotaSection 
				quotaPrompt={quotaPrompt}
				tarif={tarif}
				loading={loadingQuota}
			/>
		</aside>
	);
};

const SocialNetworks = ({ posts, getSocialLink, getSocialIcon }) => {
	const socialIds = Array.from(new Set(posts
		.filter(post => post && post.social_id)
		.map(post => post.social_id)
	));

	if (socialIds.length === 0) {
		return (
			<div className="my-2">
				<span className="text-sm font-semibold">Les réseaux sociaux utilisés</span>
				<div className="text-sm text-gray-500 mt-1">Aucun réseau social utilisé</div>
			</div>
		);
	}

	return (
		<div className="my-2">
			<span className="text-sm font-semibold">Les réseaux sociaux utilisés</span>
			<div className="flex flex-wrap items-center gap-2 my-2">
				{socialIds.map(socialId => (
					<a
						key={socialId}
						href={getSocialLink(socialId)}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex"
					>
						<Button variant="outline" circle size="none" className="p-2 hover:scale-105">
							{getSocialIcon(socialId)}
						</Button>
					</a>
				))}
			</div>
		</div>
	);
};

const CampaignStats = ({ stats, loading }) => {
	if (!stats && !loading) {
		return (
			<div className="my-2">
				<div className="text-sm text-gray-500">Aucune statistique disponible</div>
			</div>
		);
	}

	const safeStats = stats || {};
	const statValues = {
		likes: safeStats.likes || 0,
		views: safeStats.views || 0,
		shares: safeStats.shares || 0
	};

	return (
		<div className="my-2">
			{["likes", "views", "shares"].map(stat => (
				<div key={stat} className="my-2">
					<span className="text-sm font-semibold capitalize">
						{stat === "likes" ? "Mentions j'aime" : 
						 stat === "views" ? "Nombre de vues" : "Partages"}
					</span>
					<div className="table bg-linear-0 from-gray-500/10 to-transparent rounded-xl px-4 py-2">
						<strong className="text-2xl">
							{loading ? (
								<span className="inline-block h-6 w-6 animate-pulse rounded-full bg-gray-300"></span>
							) : (
								statValues[stat]
							)}
						</strong>
					</div>
				</div>
			))}
		</div>
	);
};

const QuotaSection = ({ quotaPrompt, tarif, loading }) => {
	const dailyQuotaUsed = quotaPrompt?.daily_quota_used ?? 0;
	const maxLimit = tarif?.max_limit ?? 0;
	const remaining = Math.max(0, maxLimit - dailyQuotaUsed);
	const percentage = maxLimit > 0 ? Math.min((dailyQuotaUsed / maxLimit) * 100, 100) : 0;

	const progressBarColor = dailyQuotaUsed >= maxLimit ? "bg-red-600" : "bg-blue-600";

	return (
		<SectionBlock title="Quota utilisé" icon={<BsPieChart />}>
			<div className="flex items-center justify-between gap-2">
				<span>Quotas utilisés</span>
				<strong>
					{loading ? (
						<span className="inline-block h-4 w-10 animate-pulse rounded bg-gray-300"></span>
					) : (
						`${dailyQuotaUsed}/${maxLimit}`
					)}
				</strong>
			</div>
			
			<div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
				<div
					className={`h-2.5 rounded-full transition-all duration-1000 ${progressBarColor}`}
					style={{
						width: `${percentage}%`
					}}
				></div>
			</div>
			
			<div className="mt-4 text-sm">
				{loading ? (
					<span className="inline-block h-4 w-40 animate-pulse rounded bg-gray-300"></span>
				) : dailyQuotaUsed >= maxLimit ? (
					<span className="text-red-600 font-semibold">
						Quota dépassé ! Vous ne pouvez plus lancer de prompts aujourd'hui.
					</span>
				) : (
					<span>
						Il vous reste <strong>{remaining}</strong> quota{remaining !== 1 ? 's' : ''} aujourd'hui.
					</span>
				)}
			</div>
		</SectionBlock>
	);
};

export default CampaignSidebar;