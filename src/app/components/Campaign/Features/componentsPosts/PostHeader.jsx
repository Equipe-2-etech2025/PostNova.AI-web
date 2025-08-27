// componentsPosts/PostHeader.jsx
import React from "react";
import { BsPencil } from "react-icons/bs";
import Button from "@shared/Button";

const PostHeader = ({ socialId, createdAt, onEdit, isEditing }) => {
  // Fonction pour obtenir l'icône et le nom en fonction du social_id
  const getSocialData = (socialId) => {
    switch (socialId) {
      case 1: // TikTok
        return { name: "TikTok", icon: "🎵" };
      case 2: // X (Twitter)
        return { name: "X", icon: "🐦" };
      case 3: // LinkedIn
        return { name: "LinkedIn", icon: "💼" };
      default:
        return { name: "Réseau social", icon: "📱" };
    }
  };

  const socialData = getSocialData(socialId);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full">
          <span className="text-lg">{socialData.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {socialData.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date(createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
      </div>
      
      {onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          disabled={isEditing}
          className="flex items-center gap-2"
        >
          <BsPencil size={14} />
          Éditer le post
        </Button>
      )}
    </div>
  );
};

export default PostHeader;