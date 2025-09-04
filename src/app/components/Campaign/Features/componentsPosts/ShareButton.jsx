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
			{/* Conteneur pour les boutons réseaux en demi-cercle */}
			<div
				className={`absolute right-full mr-1 mb-10 transition-all duration-300 ${showShareOptions ? "opacity-100" : "opacity-0 pointer-events-none"}`}
			>
				<button
					onClick={() => handleShare("twitter")}
					className={`absolute flex items-center justify-center w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg hover:scale-110 transition-all duration-300 tooltip ${
						showShareOptions
							? "opacity-100 scale-100 -translate-x-2 translate-y-1"
							: "opacity-0 scale-50"
					}`}
					data-tooltip="Partager sur X"
					style={{ transitionDelay: showShareOptions ? "0ms" : "0ms" }}
				>
					<BsTwitterX className="text-lg" />
				</button>

				<button
					onClick={() => handleShare("linkedin")}
					className={`absolute flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 tooltip ${
						showShareOptions
							? "opacity-100 scale-100 -translate-x-8 translate-y-5"
							: "opacity-0 scale-50"
					}`}
					data-tooltip="Partager sur LinkedIn"
					style={{ transitionDelay: showShareOptions ? "50ms" : "0ms" }}
				>
					<BsLinkedin className="text-lg" />
				</button>

				<button
					onClick={() => handleShare("tiktok")}
					className={`absolute flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-lg hover:scale-110 transition-all duration-300 tooltip ${
						showShareOptions
							? "opacity-100 scale-100 translate-x-10 -translate-y-28"
							: "opacity-0 scale-50"
					}`}
					data-tooltip="Partager sur TikTok"
					style={{ transitionDelay: showShareOptions ? "100ms" : "0ms" }}
				>
					<BsTiktok className="text-lg" />
				</button>
			</div>
	
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
