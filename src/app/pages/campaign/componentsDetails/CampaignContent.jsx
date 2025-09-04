import React from "react";
import CampaignOverview from "./CampaignOverview";
import CampaignPosts from "./CampaignPosts";
import CampaignImages from "./CampaignImages";
import CampaignLandingPages from "./CampaignLandingPages";

const CampaignContent = ({
  activeTab,
  campaignData,
  loading,
  onImageClick,
  onPostClick,
  onLandingPageClick,
  setActiveTab
}) => {
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <CampaignOverview
            images={campaignData.images}
            posts={campaignData.posts}
            landingPages={campaignData.landingPages}
            loading={loading}
            onImageClick={onImageClick}
            onPostClick={onPostClick}
            onLandingPageClick={onLandingPageClick}
            setActiveTab={setActiveTab}
          />
        );
      case 1:
        return (
          <CampaignPosts
            posts={campaignData.posts}
            loading={loading.posts}
            onPostClick={onPostClick}
          />
        );
      case 2:
        return (
          <CampaignImages
            images={campaignData.images}
            loading={loading.images}
            onImageClick={onImageClick}
          />
        );
      case 3:
        return (
          <CampaignLandingPages
            landingPages={campaignData.landingPages}
            loading={loading.landingPages}
            onLandingPageClick={onLandingPageClick}
          />
        );
      default:
        return <p>Vue d'ensemble</p>;
    }
  };

  return <div className="my-4 space-y-4">{renderContent()}</div>;
};

export default CampaignContent;