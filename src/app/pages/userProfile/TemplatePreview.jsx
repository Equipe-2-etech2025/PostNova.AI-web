import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsArrowLeft,
  BsPlay,
  BsDownload,
  BsHeart,
  BsHeartFill,
  BsShare,
  BsStarFill,
  BsTag,
  BsPeople,
  BsBarChart,
  BsGrid3X3Gap,
  BsCheck,
  BsEnvelope,
  BsInstagram,
  BsFacebook,
  BsFileText,
  BsBookmark,
  BsBookmarkFill,
} from "react-icons/bs";
import NavBar from "@layouts/NavBar";
import Button from "@shared/Button";
import MessageNotification from "@shared/MessageNotification";

const TemplatePreview = () => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("preview");

  // Données statiques du template
  const template = {
    id: 1,
    name: "Campagne Réseaux Sociaux Premium",
    description: "Modèle complet pour gérer vos campagnes sur les réseaux sociaux avec des publications optimisées.",
    category: { name: "Réseaux Sociaux", icon: BsPeople },
    type: { name: "Marketing Digital" },
    rating: 4.7,
    uses: 1243,
    author: "Équipe PostNova",
    tags: ["social", "marketing", "campagne"],
    isPremium: true,
    createdAt: "2023-10-15",
    updatedAt: "2023-11-20",
    preview: "Ce modèle inclut des stratégies éprouvées pour augmenter votre engagement sur les réseaux sociaux.",
    content: `
      <h3>Structure recommandée</h3>
      <ul>
        <li>3 publications par semaine</li>
        <li>Analyses hebdomadaires</li>
        <li>Réponses aux commentaires</li>
      </ul>
      <h3>Conseils d'utilisation</h3>
      <p>Personnalisez le contenu selon votre audience...</p>
    `,
    thumbnail: "https://source.unsplash.com/random/800x400/?social,marketing"
  };

  // Tabs configuration
  const tabs = [
    { id: "preview", label: "Aperçu", icon: BsGrid3X3Gap },
    { id: "details", label: "Détails", icon: BsFileText },
    { id: "stats", label: "Statistiques", icon: BsBarChart },
  ];

  const handleUseTemplate = () => {
    navigate(`/campaigns/create?template=${template.id}`);
  };

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleBookmark = () => setIsBookmarked(!isBookmarked);

  const renderTabContent = () => {
    switch (activeTab) {
      case "preview":
        return (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-4">Exemple de publication</h3>
                <div className="bg-white rounded-lg shadow border p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <BsFacebook className="text-blue-600" size={20} />
                    <div>
                      <div className="font-semibold">Votre Entreprise</div>
                      <div className="text-xs text-gray-500">Aujourd'hui à 14:30</div>
                    </div>
                  </div>
                  <p className="text-gray-800 mb-3">{template.preview}</p>
                  {template.thumbnail && (
                    <img 
                      src={template.thumbnail} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>
              <div className="md:w-80">
                <h3 className="text-xl font-bold mb-4">Instructions</h3>
                <div 
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: template.content }}
                />
              </div>
            </div>
          </div>
        );

      case "details":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Informations</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Nom</label>
                  <p>{template.name}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Description</label>
                  <p>{template.description}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-400">Type</label>
                  <p>{template.type.name}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6">
              <h3 className="text-lg font-semibold mb-4">Métadonnées</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Créé le {new Date(template.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        );

      case "stats":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-[#4335C4]">{template.uses}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Utilisations</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">{template.rating}/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Note moyenne</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-green-500">87%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Succès</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">642</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Téléchargements</div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      
      <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  circle
                  onClick={() => navigate(-1)}
                >
                  <BsArrowLeft size={20} />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">{template.name}</h1>
                  <p className="text-gray-600 dark:text-gray-400">{template.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  {copied ? <BsCheck /> : <BsShare />}
                  {copied ? "Copié!" : "Partager"}
                </Button>
                <Button
                  onClick={handleUseTemplate}
                  className="flex items-center gap-2 bg-[#4335C4] hover:bg-[#6366f1]"
                >
                  <BsPlay />
                  Utiliser
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-700 text-[#4335C4]"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {renderTabContent()}
        </div>
      </div>

      <MessageNotification
        message={isFavorite ? "Ajouté aux favoris" : isBookmarked ? "Ajouté aux signets" : ""}
        type="success"
        isVisible={isFavorite || isBookmarked}
        onClose={() => {}}
      />
    </>
  );
};

export default TemplatePreview;