import React from "react";
import CampaignPostItem from "@components/Campaign/CampaignPostItem";

const CampaignPosts = ({ posts, loading, onPostClick }) => {
  if (loading) {
    return <CampaignPostItem campaignPost={[]} isLoading={loading} />;
  }

  if (posts.length > 0) {
    return posts.map((post) => {
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
          isLoading={loading}
          onClick={() => onPostClick(post.id)}
        />
      );
    });
  }

  return <p className="text-gray-500 text-center mt-4">Aucune publication trouvée.</p>;
};

export default CampaignPosts;