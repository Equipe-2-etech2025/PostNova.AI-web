import React, { useState } from "react";
import { BsShare, BsTwitterX, BsLinkedin, BsTiktok } from "react-icons/bs";
import Button from "@shared/Button";

const ShareButton = ({ contentRef }) => {
	const [showShareOptions, setShowShareOptions] = useState(false);

	const handleShare = (socialNetwork) => {
		const text = contentRef.current.innerText;
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

	return (
		<div className="relative inline-flex items-center">
			<style>
				{`
          .tooltip {
            position: relative;
          }
          
          .tooltip::before {
            content: attr(data-tooltip);
            position: absolute;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
            padding: 5px 10px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            border-radius: 4px;
            font-size: 12px;
            white-space: nowrap;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s, visibility 0.2s;
            z-index: 20;
          }
          
          .tooltip::after {
            content: '';
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            border-width: 5px;
            border-style: solid;
            border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s, visibility 0.2s;
          }
          
          .tooltip:hover::before,
          .tooltip:hover::after {
            opacity: 1;
            visibility: visible;
          }
        `}
			</style>

			{/* Conteneur pour les boutons réseaux en demi-cercle en HAUT seulement */}
			<div
				className={`absolute right-full bottom-0 mb-1 transition-all duration-300 ${showShareOptions ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			>
				{/* Twitter/X - Position haut gauche */}
				<button
					onClick={() => handleShare("twitter")}
					className={`absolute flex items-center justify-center w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:scale-110 transition-all duration-300 tooltip ${
						showShareOptions
							? "opacity-100 scale-100 -translate-x-8 -translate-y-8"
							: "opacity-0 scale-50"
					}`}
					data-tooltip="Partager sur X"
					style={{ transitionDelay: showShareOptions ? "0ms" : "0ms" }}
				>
					<BsTwitterX className="text-lg" />
				</button>

				{/* LinkedIn - Position haut milieu */}
				<button
					onClick={() => handleShare("linkedin")}
					className={`absolute flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 tooltip ${
						showShareOptions
							? "opacity-100 scale-100 -translate-x-4 -translate-y-10"
							: "opacity-0 scale-50"
					}`}
					data-tooltip="Partager sur LinkedIn"
					style={{ transitionDelay: showShareOptions ? "50ms" : "0ms" }}
				>
					<BsLinkedin className="text-lg" />
				</button>

				{/* TikTok - Position haut droite */}
				<button
					onClick={() => handleShare("tiktok")}
					className={`absolute flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 tooltip ${
						showShareOptions
							? "opacity-100 scale-100 translate-x-0 -translate-y-8"
							: "opacity-0 scale-50"
					}`}
					data-tooltip="Partager sur TikTok"
					style={{ transitionDelay: showShareOptions ? "100ms" : "0ms" }}
				>
					<BsTiktok className="text-lg" />
				</button>
			</div>

			{/* Bouton principal Partager */}
			<Button
				variant="outline"
				color="secondary"
				className={`flex items-center gap-2 rounded-full px-4 py-2 z-10 transition-colors duration-300 ${
					showShareOptions
						? "bg-gray-200 dark:bg-gray-700"
						: "hover:bg-gray-100 dark:hover:bg-gray-700"
				}`}
				onClick={() => setShowShareOptions(!showShareOptions)}
			>
				<span className="text-sm">Partager</span>
				<BsShare className="text-base" />
			</Button>
		</div>
	);
};

export default ShareButton;