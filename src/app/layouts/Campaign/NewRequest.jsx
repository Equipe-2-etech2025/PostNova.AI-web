import React, { useState, useEffect } from "react";
import { generateSocialPostService } from "@services/generateSocialPostService";
import { regenerateSocialPostService } from "@services/regenerateSocialPostService";
import RequestHeader from "./components/RequestHeader";
import TopicInput from "./components/TopicInput";
import PlatformSelector from "./components/PlatformSelector";
import GeneratedPosts from "./components/GeneratedPosts";
import MessageNotification from "@shared/MessageNotification";
import { promptService } from "../../../services/promptService.js";

const NewRequest = ({
	campaignId,
	modalSize = "3xl",
	onSuccess,
	onContentGenerated,
	onContentRefresh,
}) => {
	const [showOption, setShowOption] = useState(false);
	const [selectedPlatform, setSelectedPlatform] = useState("");
	const [topic, setTopic] = useState("");
	const [generatedPosts, setGeneratedPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [prompt, setPrompt] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [isRegenerating, setIsRegenerating] = useState(false);
	const [currentPostId, setCurrentPostId] = useState(null);
	const [refreshKey, setRefreshKey] = useState(0);
	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		isVisible: false,
	});

	{
		/** Effet **/
	}
	useEffect(() => {
		if (generatedPosts.length > 0) {
			setCurrentPostId(generatedPosts[0].id);
			onContentGenerated("full");
		}
	}, [generatedPosts]);

	{
		/** Gestion des notifications **/
	}
	const showNotification = (message, type = "info") => {
		setNotification({
			message,
			type,
			isVisible: true,
		});
	};

	{
		/** Gestion des évèenements **/
	}
	const handlePlatformChange = (e) => {
		setSelectedPlatform(e.target.value);
	};

	{
		/** Génératioon de posts **/
	}
	const handleGenerate = async () => {
		if (!topic || !selectedPlatform) {
			showNotification(
				"Veuillez saisir le sujet et choisir une plateforme.",
				"warning"
			);
			return;
		}

		setLoading(true);
		setIsCreating(true);

		try {
			const promptResponse = await promptService.create({
				content: topic,
				campaign_id: campaignId,
			});

			if (!promptResponse.success) {
				if (promptResponse.type === "quota_exceeded") {
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
			const promptId = promptResponse.data.data?.id;

			const postsResponse = await generateSocialPostService({
				topic,
				platforms: [selectedPlatform],
				campaign_id: campaignId,
				prompt_id: promptResponse.data.data?.id,
				is_published: false,
			});

			if (postsResponse.success) {
				const validPosts = postsResponse.posts.filter(
					(post) =>
						post.content &&
						!post.content.toLowerCase().includes("aucun contenu disponible") &&
						post.content.trim().length > 0
				);

				if (validPosts.length === 0) {
					showNotification(
						"Aucun contenu généré. Veuillez entrer à nouveau votre requête et détaillez plus.",
						"warning"
					);
					setGeneratedPosts([]);
				} else {
					setGeneratedPosts(validPosts);
					showNotification("Prompt créé et posts générés avec succès !", "success");
					onSuccess();
					onContentGenerated("full");

					if (onContentRefresh) {
						onContentRefresh();
					}
				}
			} else {
				showNotification(
					postsResponse.message || "Erreur lors de la génération des posts.",
					"error"
				);
			}
		} catch (error) {
			console.error("Erreur API:", error);
			showNotification("Erreur de connexion à l'API.", "error");
		} finally {
			setLoading(false);
			setIsCreating(false);
		}
	};

	{
		/** Régéneration de posts **/
	}
	const handleRegenerate = async (postId, updatedTopic) => {
		if (!updatedTopic) {
			showNotification("Veuillez saisir le sujet.", "warning");
			return;
		}
		setRefreshKey((prev) => prev + 1);
		setLoading(true);
		setIsRegenerating(true);
		try {
			const promptResponse = await promptService.create({
				content: updatedTopic,
				campaign_id: campaignId,
			});
			if (!promptResponse.success) {
				if (promptResponse.type === "quota_exceeded") {
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
			const promptId = promptResponse.data.data?.id;
			const regenResponse = await regenerateSocialPostService(postId, {
				topic: updatedTopic,
				platform: selectedPlatform,
				campaign_id: campaignId,
				prompt_id: promptId,
				is_published: false,
			});
			if (regenResponse.success) {
				const updatedPost = regenResponse.data;
				if (
					!updatedPost ||
					!updatedPost.content ||
					updatedPost.content.trim().length === 0 ||
					updatedPost.content.toLowerCase().includes("aucun contenu disponible")
				) {
					showNotification(
						"Aucun contenu généré. Veuillez entrer à nouveau votre requête et détaillez plus.",
						"warning"
					);
					return;
				}

				setGeneratedPosts((prevPosts) => {
					const newPosts = prevPosts.map((post) =>
						post.id === postId ? updatedPost : post
					);
					return newPosts;
				});
				showNotification("Post régénéré avec succès !", "success");
				onContentGenerated("full");

				if (onContentRefresh) {
					onContentRefresh();
				}
			} else {
				if (regenResponse.type === "no_content") {
					showNotification(
						"Aucun contenu généré. Veuillez entrer à nouveau votre requête et détaillez more.",
						"warning"
					);
				} else {
					showNotification(
						regenResponse.message || "Erreur lors de la régénération.",
						"error"
					);
				}
			}
		} catch (error) {
			showNotification("Erreur de connexion à l'API.", "error");
		} finally {
			setLoading(false);
			setIsRegenerating(false);
		}
	};

	return (
		<div
			className={`h-full ${modalSize === "full" ? "w-full" : "w-3xl"} flex flex-col`}
		>
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
					handleRegenerate={handleRegenerate}
					loading={loading || isRegenerating}
					selectedPlatform={selectedPlatform}
					hasGeneratedPosts={generatedPosts.length > 0}
					isCreating={loading || isRegenerating}
					postId={currentPostId}
				/>

				{generatedPosts.length === 0 && (
					<PlatformSelector
						selectedPlatform={selectedPlatform}
						handlePlatformChange={handlePlatformChange}
					/>
				)}

				<div
					className={`flex-1 transition-all duration-500 ${generatedPosts.length > 0 ? "mt-4" : ""}`}
				>
					<GeneratedPosts generatedPosts={generatedPosts} key={refreshKey} />
				</div>
			</div>
		</div>
	);
};

export default NewRequest;
