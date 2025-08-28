import React from "react";

const LoadingCampaignsState = () => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
				<p className="text-gray-600 dark:text-gray-400">
					Chargement des campagnes...
				</p>
			</div>
		</div>
	);
};

export default LoadingCampaignsState;