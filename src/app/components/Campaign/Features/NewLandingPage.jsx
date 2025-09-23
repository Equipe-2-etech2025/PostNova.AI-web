import React, { useState } from "react";
import { landingPageService } from "@services/landingPageService";
import MessageNotification from "@shared/MessageNotification";
import TopicInput from "@layouts/Campaign/components/TopicInput";
import RequestHeader from "@layouts/Campaign/components/RequestHeader";
import CampaignInformationInputs from "@layouts/Campaign/components/CampaignInformationInputs";

const NewLandingPage = ({ campaign, onSuccess, modalSize = "3xl" }) => {
	const [topic, setTopic] = useState("");
	const [promptPrecision, setPromptPrecision] = useState({
		business_name: campaign?.information.business_name || "",
		email: campaign?.information.email || "",
		phone_numbers: campaign?.information.phone_numbers || "",
		company: campaign?.information.company || "",
		website: campaign?.information.website || "",
		industry: campaign?.information.industry || "",
		location: campaign?.information.location || "",
		target_audience: campaign?.information.target_audience || "",
		goals: campaign?.information.goals || "",
		budget: campaign?.information.budget || "",
		keywords: campaign?.information.keywords || "",
		preferred_style: campaign?.information.preferred_style || "",
		additional_notes: campaign?.information.additional_notes || "",
	});
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
			// const promptResponse = await promptService.create({
			// 	content: topic,
			// 	campaign_id: campaignId,
			// });

			// if (!promptResponse.success) {
			// 	if (promptResponse.type === "quota_exceeded") {
			// 		showNotification(
			// 			`Quota dépassé ! Vous avez utilisé ${promptResponse.quota_used}/${promptResponse.quota_max} prompts aujourd'hui.`,
			// 			"warning"
			// 		);
			// 	} else {
			// 		showNotification("Erreur lors de la création du prompt.", "error");
			// 	}
			// 	setLoading(false);
			// 	setIsCreating(false);
			// 	return;
			// }

			// const promptId = promptResponse.data.data?.id;

			const res = await landingPageService.generateV2({
				content: topic,
				campaign_id: campaign.id,
			});

			if (res.success) {
				onSuccess();
			} else {
				showNotification("Erreur lors de la génération de la page.", "error");
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
			// const promptResponse = await promptService.create({
			// 	content: updatedTopic,
			// 	campaign_id: campaignId,
			// });

			// if (!promptResponse.success) {
			// 	showNotification("Erreur lors de la création du prompt.", "error");
			// 	setLoading(false);
			// 	setIsCreating(false);
			// 	return;
			// }

			// const promptId = promptResponse.data.data?.id;

			const res = await landingPageService.generateV2({
				content: updatedTopic,
				campaign_id: campaign.id,
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
			className={`h-full ${modalSize === "full" ? "w-full" : "md:w-xl lg:w-3xl"} flex flex-col p-5`}
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
				placeholder={"Décrivez votre landing page..."}
				handleGenerate={handleGenerateLandingPages}
				handleRegenerate={handleRegenerate}
				loading={loading}
				isCreating={isCreating}
				hasGeneratedPosts={false}
				selectedPlatform="any"
			/>

			<div className="max-h-72 md:max-h-120 mt-2 overflow-y-auto">
				<CampaignInformationInputs state={promptPrecision} setState={setPromptPrecision} />
			</div>
		</div>
	);
};

export default NewLandingPage;
