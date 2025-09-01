import React from "react";
import {
	BsHeart,
	BsTiktok,
	BsTwitterX,
	BsLinkedin,
	BsEye,
} from "react-icons/bs";
import Button from "@shared/Button";
import { Card } from "@shared/Card";
import { useContentFormatter } from "@hooks/useContentFormatter";

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

const CampaignPostItem = ({
	campaignPost,
	isLoading = true,
	onClick,
	compactView = false,
}) => {
	const { formatContent, formatHashtags } = useContentFormatter();

	if (!campaignPost) return null;
	if (isLoading) {
		return <CampaignPostItemSkeleton />;
	}

	const formattedContent = formatContent(campaignPost.content);

	const formattedHashtags = formatHashtags(campaignPost.hashtags);

	const getSocialData = (socialId) => {
		switch (socialId) {
			case 1:
				return {
					icon: (
						<BsTiktok
							size={40}
							className="border border-black/50 dark:border-white/50 rounded-full p-2"
						/>
					),
					name: "TikTok",
				};
			case 2:
				return {
					icon: (
						<BsTwitterX
							size={40}
							className="border border-black/50 dark:border-white/50 rounded-full p-2"
						/>
					),
					name: "X",
				};
			case 3:
				return {
					icon: (
						<BsLinkedin
							size={40}
							className="border border-black/50 dark:border-white/50 rounded-full p-2"
						/>
					),
					name: "LinkedIn",
				};
			default:
				return {
					icon: (
						<BsTiktok
							size={40}
							className="border border-black/50 dark:border-white/50 rounded-full p-2"
						/>
					),
					name: "Réseau social",
				};
		}
	};

	const socialData = getSocialData(campaignPost.social_id);

	if (isLoading) {
		return (
			<Card shadow="sm" className="p-4">
				<div className="animate-pulse space-y-3">
					<div className="h-4 bg-gray-200 rounded w-3/4"></div>
					<div className="h-4 bg-gray-200 rounded"></div>
				</div>
			</Card>
		);
	}

	return (
		<div className="cursor-pointer" onClick={onClick}>
			<Card
				shadow="sm"
				onClick={onClick}
				className={`${compactView ? "p-2" : "p-4"} cursor-pointer hover:bg-gray-50 transition-colors`}
			>
				{compactView ? (
					<div className="flex items-center gap-3">
						<div className="flex items-center justify-center bg-gray-500/10 rounded-xl p-2">
							{socialData.icon}
						</div>
						<div className="flex-1 min-w-0">
							{/* Utilisation du contenu formaté */}
							<p
								className="text-sm line-clamp-1 truncate"
								dangerouslySetInnerHTML={{ __html: formattedContent }}
							/>
							<span className="text-xs text-gray-500">
								{new Date(campaignPost.created_at).toLocaleDateString()}
							</span>
						</div>
					</div>
				) : (
					<div className="space-y-3">
						<div className="flex items-start gap-4">
							<div className="flex items-center justify-center bg-gray-500/10 rounded-xl p-4">
								{socialData.icon}
							</div>
							<div className="flex-1 space-y-1">
								<div className="flex items-center justify-between">
									<h4 className="text-lg font-bold">{socialData.name}</h4>
									<span className="text-sm text-gray-500">
										{new Date(campaignPost.created_at).toLocaleDateString()}
									</span>
								</div>
								{/* Utilisation du contenu formaté */}
								<p
									className="leading-relaxed line-clamp-2"
									dangerouslySetInnerHTML={{ __html: formattedContent }}
								/>

								{/* Affichage des hashtags formatés */}
								{formattedHashtags.length > 0 && (
									<div className="flex flex-wrap gap-1 mt-2">
										{formattedHashtags.map((tag, index) => (
											<span
												key={index}
												className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</div>
						</div>
						<div className="flex justify-end">
							<Button variant="ghost" size="sm" className="flex items-center gap-1">
								<BsEye size={16} />
							</Button>
						</div>
					</div>
				)}
			</Card>
		</div>
	);
};

export default CampaignPostItem;
