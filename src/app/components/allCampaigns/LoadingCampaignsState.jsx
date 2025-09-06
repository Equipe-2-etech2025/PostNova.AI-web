import React from "react";
import Spinner from "@components/Spinner";

const LoadingCampaignsState = () => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
			<div className="text-center">
				<Spinner />
				<p className="text-gray-600 dark:text-gray-400">
					Chargement des campagnes...
				</p>
			</div>
		</div>
	);
};

export default LoadingCampaignsState;