import React, { useState } from "react";
import { BsPencilFill } from "react-icons/bs";
import Tag from "@shared/Tag";
import Button from "@shared/Button";

const CampaignHeader = ({
	name,
	description,
	status,
	originalStatus,
	loading,
	onEdit,
	onShare
}) => {
	const [showShareModal, setShowShareModal] = useState(false);

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

	{/* API pour le partage de campagne dans explorer*/}
	const handleShare = async () => {
		console.log("Appel API de partage (à implémenter ici)");
		setShowShareModal(false);
	};

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
				<div className="flex items-start gap-3">
					<p className="text-gray-600 dark:text-gray-300 text-lg leading-7 flex-1">
						{description}
					</p>
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
							className="transition-all duration-300 
									   group-hover:text-purple-700 dark:group-hover:text-purple-400 
									   group-hover:rotate-12"
						/>
					</Button>

					{/* <Button
						variant="solid"
						className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium
              text-white bg-gradient-to-r from-purple-500 to-pink-500
              hover:from-purple-600 hover:to-pink-600
              transition-all duration-300 transform 
              hover:scale-105
              active:scale-95
              disabled:opacity-60 disabled:cursor-not-allowed
              relative overflow-hidden border-none"
						onClick={() => setShowShareModal(true)}
					>
						Partager
					</Button> */}

					<Button
						variant="solid"
						className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg px-4 py-2"
						onClick={onShare}
					>
						Partager
					</Button>
				</div>
			</div>

			{/* Modale de confirmation
			{showShareModal && (
				<div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-[400px]">
						<h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
							Voulez-vous vraiment partager vos campagnes aux réseaux Nova ?
						</h2>
						<div className="flex justify-end gap-3">
							<Button
								variant="ghost"
								className="bg-gray-200 text-gray-800 hover:bg-gray-300 px-4 py-2 rounded-lg"
								onClick={() => setShowShareModal(false)}
							>
								Non
							</Button>
							<Button
								variant="solid"
								className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
								onClick={handleShare}
							>
								Oui
							</Button>
						</div>
					</div>
				</div>
			)} */}
		</section>
	);
};

export default CampaignHeader;
