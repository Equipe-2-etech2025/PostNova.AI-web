import React, { useRef, useState } from "react";
import {
  BsCalendar2,
  BsCopy,
  BsMagic,
  BsPencil,
  BsShare,
  BsLinkedin,
  BsTwitterX,
  BsTiktok,
  BsCheck,
} from "react-icons/bs";
import { useNotification } from "@hooks/useNotification";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";
import SectionBlock from "@layouts/SectionBlock";

const Post = ({ postData }) => {
  const postContentRef = useRef();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { notification, hideNotification, showSuccess, showError } = useNotification();

  // --- Fonction pour formater le contenu ---
  const formatContent = (content) => {
    if (!content) return "Aucun contenu disponible";

    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")          
      .replace(/(#\w[\w-]*)/g, "")              
      .replace(/\n/g, "<br />");                 
  };

  // --- Fonction pour afficher les hashtags séparément ---
  const formatHashtags = (hashtags) => {
    if (!hashtags) return [];
    return hashtags
      .replace(/\*\*/g, "")
      .trim()
      .split(/\s+/)
      .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postContentRef.current.innerText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      showSuccess("Contenu copié !", { duration: 2000, position: "top-center" });
    } catch (err) {
      console.error("Erreur lors de la copie :", err.message);
      showError("Échec de la copie", { duration: 3000, position: "top-center" });
    }
  };

  const handleShare = (socialNetwork) => {
    const text = postContentRef.current.innerText;
    let shareUrl = "";

    switch (socialNetwork) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
        break;
      case "tiktok":
        shareUrl = "https://www.tiktok.com/";
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "noopener,noreferrer");
    setShowShareOptions(false);
  };

  const getSocialName = (socialId) => {
    switch (socialId) {
      case 1:
        return "TikTok";
      case 2:
        return "X (Twitter)";
      case 3:
        return "LinkedIn";
      default:
        return "Réseau social";
    }
  };

  return (
    <>
      <MessageNotification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
        autoHide
        duration={5000}
        position="top-center"
        showProgressBar
      />

      <div className="w-full max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Publication</h3>
            <span className="text-2xl">{getSocialName(postData?.social_id)}</span>
          </div>

          <div className="w-2/3 rounded-2xl space-y-3 mx-auto">
            <p
              ref={postContentRef}
              className="text-lg leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: formatContent(postData?.content),
              }}
            ></p>

            {/* Affichage des hashtags séparément */}
            {postData?.hashtags && (
              <div className="text-sm text-gray-500 mt-2">
                {formatHashtags(postData.hashtags).map((tag, i) => (
                  <span key={i} className="mr-2">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 mt-3">
              <BsCalendar2 />
              <p>
                <strong>Généré le</strong> :{" "}
                {postData?.created_at
                  ? new Date(postData.created_at).toDateString()
                  : new Date().toDateString()}
              </p>
            </div>

            <div className="text-end space-x-2 relative mt-3">
              <div className="inline-flex items-center gap-2">
                <Button
                  variant="outline"
                  className={`flex items-center gap-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded ${
                    isCopied
                      ? "bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white shadow-lg shadow-purple-500/30"
                      : ""
                  }`}
                  onClick={handleCopyToClipboard}
                >
                  {isCopied ? (
                    <>
                      <BsCheck className="text-white" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <span>Copier</span>
                      <BsCopy />
                    </>
                  )}
                </Button>

                {isCopied && (
                  <span className="text-sm text-green-500 font-medium animate-fade-in">
                    ✓ Copié !
                  </span>
                )}
              </div>

              <div className="inline-block">
                <Button
                  variant="outline"
                  color="secondary"
                  className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  onClick={() => setShowShareOptions(!showShareOptions)}
                >
                  <span>Partager</span>
                  <BsShare />
                </Button>

                {showShareOptions && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                    <div className="p-2 space-y-2">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <BsTwitterX className="text-black dark:text-white" />
                        <span>Partager sur X</span>
                      </button>
                      <button
                        onClick={() => handleShare("linkedin")}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <BsLinkedin className="text-blue-600" />
                        <span>Partager sur LinkedIn</span>
                      </button>
                      <button
                        onClick={() => handleShare("tiktok")}
                        className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        <BsTiktok className="text-black dark:text-white" />
                        <span>Partager sur TikTok</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <SectionBlock
            title="Prompt"
            icon={<BsMagic />}
            action={
              <Button color="neutral" circle size="none" className="p-2">
                <BsPencil size={12} />
              </Button>
            }
          >
            {postData?.prompt || "Aucun prompt disponible"}
          </SectionBlock>
        </div>
      </div>
    </>
  );
};

export default Post;
