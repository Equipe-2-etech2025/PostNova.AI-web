import React from "react";
import { useCampaigns } from "@hooks/useCampaigns";
import { useCampaignFilters } from "@hooks/useCampaignFilters";
import CampaignPost from "@components/allCampaigns/CampaignPost";
import CampaignsFilters from "@components/allCampaigns/CampaignsFilters";
import CampaignsPagination from "@components/allCampaigns/CampaignsPagination";
import EmptyCampaignsState from "@components/allCampaigns/EmptyCampaignsState";
import LoadingCampaignsState from "@components/allCampaigns/LoadingCampaignsState";

const CampaignsListPage = () => {
	const {
		campaigns,
		loading,
		likedCampaigns,
		currentUserId,
		handleLike,
		handleShare,
		handleBookmark,
		typeOptions,
	} = useCampaigns();

	const {
		searchTerm,
		setSearchTerm,
		selectedStatus,
		setSelectedStatus,
		selectedType,
		setSelectedType,
		sortBy,
		setSortBy,
		currentPage,
		setCurrentPage,
		showFilters,
		setShowFilters,
		paginatedCampaigns,
		totalPages,
		clearFilters,
	} = useCampaignFilters(campaigns);

	if (loading) {
		return <LoadingCampaignsState />;
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
			{/* Header et filtres */}
			<CampaignsFilters
				showFilters={showFilters}
				setShowFilters={setShowFilters}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				selectedStatus={selectedStatus}
				setSelectedStatus={setSelectedStatus}
				selectedType={selectedType}
				setSelectedType={setSelectedType}
				sortBy={sortBy}
				setSortBy={setSortBy}
				typeOptions={typeOptions}
				clearFilters={clearFilters}
			/>

			{/* Feed principal */}
			<div className="max-w-2xl mx-auto px-4 py-6">
				{/* Posts des campagnes */}
				{paginatedCampaigns.length > 0 ? (
					<div className="space-y-6">
						{paginatedCampaigns.map((campaign) => (
							<div key={campaign.id} className="animate-in fade-in duration-300">
								<CampaignPost
									campaign={campaign}
									onLike={handleLike}
									onShare={handleShare}
									onBookmark={handleBookmark}
									currentUserId={currentUserId}
									isLiked={
										campaign.user_has_liked || likedCampaigns.has(campaign.id) || false
									}
								/>
							</div>
						))}
					</div>
				) : (
					<EmptyCampaignsState clearFilters={clearFilters} />
				)}

				{/* Pagination */}
				<CampaignsPagination
					currentPage={currentPage}
					totalPages={totalPages}
					setCurrentPage={setCurrentPage}
				/>
			</div>
		</div>
	);
};

export default CampaignsListPage;
