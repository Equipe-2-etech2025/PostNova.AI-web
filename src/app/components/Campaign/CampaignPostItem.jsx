import React from "react";
import { BsHeart, BsTiktok, BsTwitterX, BsLinkedin } from "react-icons/bs";
import Button from "@shared/Button";
import { Card } from "@shared/Card";

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

const CampaignPostItem = ({ campaignPost, isLoading = true, onClick ,  compactView = false}) => {
  if (!campaignPost) return null;
  if (isLoading) {
    return <CampaignPostItemSkeleton />;
  }

  // Fonction pour obtenir l'icône et le nom en fonction du social_id
  const getSocialData = (socialId) => {
    switch(socialId) {
      case 1: // TikTok
        return {
          icon: <BsTiktok size={40} className="border border-black/50 dark:border-white/50 rounded-full p-2" />,
          name: "TikTok"
        };
      case 2: // X (Twitter)
        return {
          icon: <BsTwitterX size={40} className="border border-black/50 dark:border-white/50 rounded-full p-2" />,
          name: "X"
        };
      case 3: // LinkedIn
        return {
          icon: <BsLinkedin size={40} className="border border-black/50 dark:border-white/50 rounded-full p-2" />,
          name: "LinkedIn"
        };
      default:
        return {
          icon: <BsTiktok size={40} className="border border-black/50 dark:border-white/50 rounded-full p-2" />,
          name: "Réseau social"
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
	<div 
      className="cursor-pointer"
      onClick={onClick}
    >
    <Card 
      shadow="sm" 
      onClick={onClick}
      className={`${compactView ? "p-2" : "p-4"} cursor-pointer hover:bg-gray-50 transition-colors`}
    >
      {compactView ? (
        // Vue réduite
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center bg-gray-500/10 rounded-xl p-2">
            {socialData.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm line-clamp-1 truncate">
              {campaignPost.content.replace(/<br\s*\/?>/gi, " ")}
            </p>
            <span className="text-xs text-gray-500">
              {new Date(campaignPost.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ) : (
        // Vue normale
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
              <p className="leading-relaxed line-clamp-2">
                {campaignPost.content.replace(/<br\s*\/?>/gi, " ")}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <BsHeart size={16} />
              <span>0</span>
            </Button>
          </div>
        </div>
      )}
    </Card>
	</div>
  );
};

export default CampaignPostItem;