// componentsPosts/PostContent.jsx
import React, { useState, useEffect } from "react";
import { useContentFormatter } from "@hooks/useContentFormatter";
import { socialPostService } from "@services/socialPostService";
import { useNotification } from "@hooks/useNotification";
import Button from "@shared/Button";
import { BsCheck, BsX } from "react-icons/bs";

const PostContent = ({
  content,
  hashtags,
  postId,
  onUpdate,
  isEditing: externalIsEditing,
  onEdit,
  onCancelEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { formatContent, unformatContent, formatHashtags } = useContentFormatter();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    if (externalIsEditing !== undefined) {
      setIsEditing(externalIsEditing);
    }
  }, [externalIsEditing]);

  useEffect(() => {
    // Utiliser unformatContent pour initialiser le textarea avec le contenu brut
    setEditedContent(unformatContent(content));
  }, [content, unformatContent]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(unformatContent(content));
    if (onEdit) onEdit();
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(unformatContent(content));
    if (onCancelEdit) onCancelEdit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    if (!editedContent.trim()) {
      showError("Le contenu ne peut pas être vide");
      return;
    }

    setIsLoading(true);
    try {
      const response = await socialPostService.updateSocialPost(postId, {
        content: editedContent,
      });
      
      console.log("Réponse API:", response); // Debug
      
      showSuccess("Post modifié avec succès");
      setIsEditing(false);
      if (onUpdate) {
        onUpdate(editedContent);
      }
    } catch (error) {
      console.error("Erreur détaillée:", error.response || error); // Debug
      showError(error.response?.data?.message || "Erreur lors de la modification du post");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault(); // Empêche l'ajout d'une nouvelle ligne
      handleSubmit(e);
    }
    if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full min-h-[350px] p-6 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 resize-none focus:ring-2 focus:ring-blue-500 
                     focus:border-transparent font-mono text-sm"
            placeholder="Modifiez le contenu du post..."
            disabled={isLoading}
            autoFocus
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Appuyez sur Ctrl+Enter pour enregistrer, Esc pour annuler
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <BsCheck size={16} />
            {isLoading ? "Enregistrement..." : "Valider"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <BsX size={16} />
            Annuler
          </Button>
        </div>
      </form>
    );
  }

  const formattedContent = formatContent(content);
  const formattedHashtags = formatHashtags(hashtags);

  return (
    <div className="space-y-4 w-2/3 rounded-2xl space-y-3 mx-auto">
      <div
        className="text-gray-900 text-lg dark:text-white leading-relaxed whitespace-pre-wrap"
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />

      {formattedHashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formattedHashtags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                       bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostContent;