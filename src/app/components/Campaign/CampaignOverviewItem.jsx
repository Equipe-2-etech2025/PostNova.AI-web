import React from "react";
import { Card } from "@shared/Card";
import Button from "@shared/Button";
import Tag from "@shared/Tag"; // Assurez-vous d'importer Tag si vous l'utilisez
import { BsHeart, BsTiktok } from "react-icons/bs";

// Composant Skeleton - doit être exporté si utilisé ailleurs
const CampaignOverviewItemSkeleton = () => {
  return (
    <Card shadow="sm">
      <div className="space-y-4">
        <div className="w-full flex flex-col items-start gap-4 font-medium">
          <div className="w-full">
            <div className="h-4 w-1/4 bg-gray-500/10 rounded animate-pulse"></div>
          </div>
          <div className="h-5 w-full bg-gray-500/10 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-3">
          <ul>
            {[...Array(3)].map((_, i) => (
              <li key={i} className="inline-block mr-2">
                <span className="flex items-center justify-center border border-gray-500/10 px-2 py-2 rounded-full text-sm">
                  <span className="bg-gray-500/10 w-4 h-4 inline-block rounded-full animate-pulse"></span>
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </Card>
  );
};

// Composant principal
const CampaignOverviewItem = ({ campaignOverview, isLoading = true, onClick }) => {
  if (isLoading) {
    return <CampaignOverviewItemSkeleton />;
  }

  return (
    <Card shadow="sm" className="hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="font-bold">{campaignOverview.name || "Sans titre"}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Créé le {new Date(campaignOverview.created_at).toLocaleDateString()}
            </p>
          </div>
          <Tag color="blue">{campaignOverview.type || "Contenu"}</Tag>
        </div>
        
        {campaignOverview.preview && (
          <div className="mt-3">
            {campaignOverview.type === 'image' ? (
              <img 
                src={campaignOverview.preview} 
                alt="Preview" 
                className="w-full h-32 object-cover rounded"
              />
            ) : (
              <p className="line-clamp-2 text-gray-700">
                {campaignOverview.preview}
              </p>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-2">
            {campaignOverview.tags?.map((tag, index) => (
              <Tag key={index} color="gray" size="sm">
                {tag}
              </Tag>
            ))}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClick}
          >
            Voir plus
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CampaignOverviewItem;
export { CampaignOverviewItemSkeleton };