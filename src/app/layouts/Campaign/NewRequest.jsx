import React, { useState, useEffect } from "react";
import { generateSocialPostService } from "@services/generateSocialPostService";

import RequestHeader from "./components/RequestHeader";
import TopicInput from "./components/TopicInput";
import PlatformSelector from "./components/PlatformSelector";
import GeneratedPosts from "./components/GeneratedPosts";
import MessageNotification from "@shared/MessageNotification";
import { promptService } from "../../../services/promptService.js";

const NewRequest = ({ campaignId, onSuccess, onContentGenerated }) => {
	const [showOption, setShowOption] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState("");
	const [topic, setTopic] = useState("");
	const [generatedPosts, setGeneratedPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		isVisible: false,
	});

	const showNotification = (message, type = "info") => {
		setNotification({
			message,
			type,
			isVisible: true,
		});
	};

	const handlePlatformChange = (e) => {
		setSelectedPlatform(e.target.value);
	};

	const handleGenerate = async () => {
		if (!topic || !selectedPlatform) {
			showNotification(
				"Veuillez saisir le sujet et choisir une plateforme.",
				"warning"
			);
			return;
		}

		setLoading(true);

		try {
			const promptResponse = await promptService.create({
				content: topic,
				campaign_id: campaignId,
			});

			if (!promptResponse.success) {
				if (promptResponse.type === "quota_exceeded") {
					console.log("reponse type execeed", promptResponse.type);
					showNotification(
						`Quota dépassé ! Vous avez utilisé ${promptResponse.quota_used}/${promptResponse.quota_max} prompts aujourd'hui. Passez au plan PRO pour continuer.`,
						"warning"
					);
				} else {
					showNotification(
						promptResponse.message || "Erreur lors de la création du prompt.",
						"error"
					);
				}
				setLoading(false);
				return;
			}

			setPrompt(promptResponse.data.data);
			console.log(promptResponse.data.data);

			const postsResponse = await generateSocialPostService({
				topic,
				platforms: [selectedPlatform],
				campaign_id: campaignId,
				is_published: false,
			});

			console.log("Generated posts response:", postsResponse);

			if (postsResponse.success) {
				setGeneratedPosts(postsResponse.posts);
				showNotification("Prompt créé et posts générés avec succès !", "success");

				if (onContentGenerated) {
					onContentGenerated("full");
				}

				if (onSuccess) {
					onSuccess();
				}
			} else {
				if (postsResponse.type === "quota_exceeded") {
					showNotification(
						`Quota dépassé ! Vous avez utilisé ${postsResponse.quota_used}/${postsResponse.quota_max} posts aujourd'hui. Passez au plan PRO pour continuer.`,
						"warning"
					);
				} else {
					showNotification(
						postsResponse.message || "Erreur lors de la génération des posts.",
						"error"
					);
				}
			}
		} catch (error) {
			console.error("Erreur API:", error);
			showNotification("Erreur de connexion à l'API.", "error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-full w-3xl flex flex-col">
			{/* Notification */}
			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
				autoHide={true}
				duration={5000}
				position="top-center"
				showProgressBar={true}
			/>

			<RequestHeader />
			<div className="flex-1 flex flex-col">
				<TopicInput
					topic={topic}
					setTopic={setTopic}
					showOption={showOption}
					setShowOption={setShowOption}
					handleGenerate={handleGenerate}
					loading={loading}
					selectedPlatform={selectedPlatform}
					hasGeneratedPosts={generatedPosts.length > 0}
					isCreating={loading}
				/>

				{/* Masquer le sélecteur de plateforme après génération */}
				{generatedPosts.length === 0 && (
					<PlatformSelector
						selectedPlatform={selectedPlatform}
						handlePlatformChange={handlePlatformChange}
					/>
				)}

				{/* Section des posts générés */}
				<div
					className={`flex-1 transition-all duration-500 ${generatedPosts.length > 0 ? "mt-4" : ""}`}
				>
					<GeneratedPosts generatedPosts={generatedPosts} />
				</div>
			</div>
		</div>
	);
};

export default NewRequest;
