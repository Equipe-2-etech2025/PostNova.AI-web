import React from "react";
import CampaignLandingPageItem from "@components/Campaign/CampaignLandingPageItem";

const CampaignLandingPages = ({ landingPages, loading, onLandingPageClick }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CampaignLandingPageItem
          campaignLandingPage={[]}
          isLoading={loading}
        />
        <CampaignLandingPageItem
          campaignLandingPage={[]}
          isLoading={loading}
        />
      </div>
    );
  }

  if (landingPages.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {landingPages.map((campaignLandingPage) => (
          <CampaignLandingPageItem
            key={campaignLandingPage.id}
            campaignLandingPage={campaignLandingPage}
            isLoading={loading}
            onClick={onLandingPageClick}
          />
        ))}
      </div>
    );
  }

  return <p className="text-gray-500 text-center mt-4">Aucune page trouvée.</p>;
};

export default CampaignLandingPages;