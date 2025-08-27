import React from "react";
import Button from "@shared/Button";
import CampaignImageItem from "@components/Campaign/CampaignImageItem";
import CampaignPostItem from "@components/Campaign/CampaignPostItem";
import CampaignLandingPageItem from "@components/Campaign/CampaignLandingPageItem";
import { CampaignOverviewItemSkeleton } from "@components/Campaign/CampaignOverviewItem";

const CampaignOverview = ({
  images,
  posts,
  landingPages,
  loading,
  onImageClick,
  onPostClick,
  onLandingPageClick,
  setActiveTab
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  if (loading.all) {
    return (
      <div className="space-y-4">
        <CampaignOverviewItemSkeleton />
        <CampaignOverviewItemSkeleton />
        <CampaignOverviewItemSkeleton />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-10 mt-6">
      {/* Section Images */}
      {images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 px-10">
            Images générées ({images.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.slice(0, 4).map((image) => (
              <CampaignImageItem
                key={image.id}
                campaignImage={{
                  ...image,
                  content: image.path,
                  formattedDate: formatDate(image.created_at),
                }}
                onClick={() => onImageClick(image)}
              />
            ))}
            {images.length > 4 && (
              <div className="mt-2">
                <Button
                  variant="ghost"
                  className="text-purple-600"
                  onClick={() => setActiveTab(2)}
                >
                  Voir toutes les images ({images.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Section Posts Sociaux */}
      {posts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 px-10">
            Publications ({posts.length})
          </h3>
          <div className="space-y-4 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {posts.slice(0, 4).map((post) => {
              const cleanedContent = post.content
                ? post.content.replace(/<br\s*\/?>/gi, "\n")
                : "";

              return (
                <CampaignPostItem
                  key={post.id}
                  campaignPost={{
                    ...post,
                    content: cleanedContent,
                  }}
                  isLoading={false}
                  onClick={() => onPostClick(post.id)}
                  compactView={true}
                />
              );
            })}
          </div>
          {posts.length > 3 && (
            <Button
              variant="ghost"
              className="mt-2 text-purple-600"
              onClick={() => setActiveTab(1)}
            >
              Voir toutes les publications ({posts.length})
            </Button>
          )}
        </div>
      )}

      {/* Section Landing Pages */}
      {landingPages.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-bold mb-4 px-10">
            Landing Pages ({landingPages.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landingPages.map((page) => (
              <CampaignLandingPageItem
                key={page.id}
                campaignLandingPage={page}
                isLoading={false}
                onClick={onLandingPageClick}
                compactView={true}
              />
            ))}
            {landingPages.length > 4 && (
              <div className="mt-2">
                <Button
                  variant="ghost"
                  className="text-purple-600"
                  onClick={() => setActiveTab(3)}
                >
                  Voir tous les landing page ({landingPages.length})
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message si vide */}
      {images.length === 0 && posts.length === 0 && landingPages.length === 0 && (
        <p className="text-gray-500 text-center py-8">
          Aucun contenu généré pour cette campagne
        </p>
      )}
    </div>
  );
};

export default CampaignOverview;