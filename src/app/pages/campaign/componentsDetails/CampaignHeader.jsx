import React, { useState } from "react";
import { BsPencilFill, BsShareFill } from "react-icons/bs";
import Tag from "@shared/Tag";
import Button from "@shared/Button";

const CampaignHeader = ({
	name,
	is_published,
	description,
	status,
	originalStatus,
	loading,
	onEdit,
	onShare,
}) => {
	const getStatusColor = (englishStatus) => {
		const statusColorMap = {
			created: "blue",
			processing: "orange",
			pending: "yellow",
			completed: "green",
			failed: "red",
		};
		return statusColorMap[englishStatus] || "gray";
	};

	if (loading) {
		return (
			<section className="py-4">
				<div className="space-y-2 shadow-lg rounded-xl p-6 bg-white dark:bg-gray-800">
					<div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
					<div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
				</div>
			</section>
		);
	}

	const statusColor = getStatusColor(originalStatus);

	return (
		<section className="py-4">
			<div
				className="bg-gray-50 space-y-4 shadow-lg rounded-2xl p-8 
                           dark:bg-gray-700/15 
                           border border-gray-100 dark:border-gray-700 
                           transition-all duration-300 
                           hover:shadow-xl hover:border-purple-100 dark:hover:border-purple-900"
			>
				<span className="flex items-center gap-4 text-3xl font-bold">
					<h1 className="text-gray-800 dark:text-white">{name}</h1>
					<Tag color={statusColor}>{status}</Tag>
				</span>
				<div className="flex flex-col md:flex-row items-start gap-3">
					<p className="text-gray-600 dark:text-gray-300 text-lg leading-7 flex-1 line-clamp-3 md:line-clamp-none">
						{description}
					</p>
					<div className="flex items-center">
						<Button
							variant="ghost"
							size="none"
							className="text-gray-400 dark:text-gray-500 
                                   hover:text-purple-600 dark:hover:text-purple-400 
                                   transition-all duration-300 
                                   transform hover:scale-110 
                                   hover:bg-purple-50 dark:hover:bg-purple-900/20 
                                   p-2 rounded-full group"
							onClick={onEdit}
						>
							<BsPencilFill
								size={18}
								className="transition-all duration-300 group-hover:text-purple-700 dark:group-hover:text-purple-400 group-hover:rotate-12"
							/>
						</Button>
						{is_published ? (
							<span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 text-white font-semibold rounded-lg px-4 py-2 shadow-md">
								<BsShareFill className="text-lg" />
								Déjà partagé
							</span>
						) : (
							<Button
								variant="solid"
								className="bg-purple-600 hover:bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 border-none text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2"
								onClick={onShare}
							>
								<BsShareFill className="text-lg" />
								Partager
							</Button>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default CampaignHeader;
