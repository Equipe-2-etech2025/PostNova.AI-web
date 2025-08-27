import React from "react";
import CampaignImageItem from "@components/Campaign/CampaignImageItem";

const CampaignImages = ({ images, loading, onImageClick }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date inconnue";
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, index) => (
          <CampaignImageItem key={`loading-${index}`} isLoading={true} />
        ))}
      </div>
    );
  }

  if (images?.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image) => (
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
      </div>
    );
  }

  return <p className="text-gray-500 text-center mt-4">Aucune image trouvée.</p>;
};

export default CampaignImages;