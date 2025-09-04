import React, { useState, useEffect } from "react";
import { landingPageService } from "@services/landingPageService";
import { promptService } from "@services/promptService";
import MessageNotification from "@shared/MessageNotification";
import TopicInput from "@layouts/Campaign/components/TopicInput";
import RequestHeader from "@layouts/Campaign/components/RequestHeader";

const NewLandingPage = ({
	campaignId,
	onSuccess,
	modalSize = "3xl",
}) => {
	const [topic, setTopic] = useState("");
	const [loading, setLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		isVisible: false,
	});

	const showNotification = (message, type = "info") => {
		setNotification({ message, type, isVisible: true });
	};

	const handleGenerateLandingPages = async () => {
		if (!topic) {
			showNotification(
				"Veuillez saisir un sujet pour la landing page.",
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
						`Quota dépassé ! Vous avez utilisé ${promptResponse.quota_used}/${promptResponse.quota_max} prompts aujourd'hui.`,
						"warning"
					);
				} else {
					showNotification("Erreur lors de la création du prompt.", "error");
				}
				setLoading(false);
				setIsCreating(false);
				return;
			}

			const promptId = promptResponse.data.data?.id;

			const res = await landingPageService.generate({
				prompt: topic,
				campaign_id: campaignId,
				prompt_id: promptId,
			});

			if (res.success) {
				onSuccess();
			} else {
				showNotification(
					res.data.message || "Erreur lors de la génération des images.",
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

	const handleRegenerate = async (landingPageId, updatedTopic) => {
		if (!updatedTopic) {
			showNotification("Veuillez saisir un sujet.", "warning");
			return;
		}

		setLoading(true);
		setIsCreating(true);

		try {
			const promptResponse = await promptService.create({
				content: updatedTopic,
				campaign_id: campaignId,
			});

			if (!promptResponse.success) {
				showNotification("Erreur lors de la création du prompt.", "error");
				setLoading(false);
				setIsCreating(false);
				return;
			}

			const promptId = promptResponse.data.data?.id;

			const res = await landingPageService.generate({
				prompt: updatedTopic,
				campaign_id: campaignId,
				prompt_id: promptId,
			});

			console.log(res);
		} catch (error) {
			console.error(error);
			showNotification("Erreur de connexion à l'API.", "error");
		} finally {
			setLoading(false);
			setIsCreating(false);
		}
	};

	return (
		<div
			className={`h-full ${modalSize === "full" ? "w-full" : "w-3xl"} flex flex-col p-5`}
		>
			<RequestHeader headerText="Générer une Landing Page" />

			<MessageNotification
				message={notification.message}
				type={notification.type}
				isVisible={notification.isVisible}
				onClose={() => setNotification({ ...notification, isVisible: false })}
			/>

			{/* TopicInput avec LoadingSpinnerNova */}
			<TopicInput
				topic={topic}
				setTopic={setTopic}
				handleGenerate={handleGenerateLandingPages}
				handleRegenerate={handleRegenerate}
				loading={loading}
				isCreating={isCreating}
				hasGeneratedPosts={false}
				selectedPlatform="any"
			/>
		</div>
	);
};

export default NewLandingPage;
