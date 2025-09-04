import React, { useState, useEffect } from "react";
import { generateImageService } from "@services/generateImageService";
import { promptService } from "@services/promptService";
import MessageNotification from "@shared/MessageNotification";
import TopicInput from "@layouts/Campaign/components/TopicInput";
import RequestHeader from "@layouts/Campaign/components/RequestHeader";

const ImageMarketing = ({
	campaignId,
	onSuccess,
	onContentGenerated,
	modalSize = "3xl",
}) => {
	const [topic, setTopic] = useState("");
	const [loading, setLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [generatedImages, setGeneratedImages] = useState([]);
	const [currentImageId, setCurrentImageId] = useState(null);
	const [notification, setNotification] = useState({
		message: "",
		type: "info",
		isVisible: false,
	});

	const showNotification = (message, type = "info") => {
		setNotification({ message, type, isVisible: true });
	};

	useEffect(() => {
		if (generatedImages.length > 0) {
			setCurrentImageId(generatedImages[0].id);
			onContentGenerated?.("full");
		}
	}, [generatedImages]);

	const handleGenerateImages = async () => {
		if (!topic) {
			showNotification("Veuillez saisir un sujet pour l'image.", "warning");
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

			const imagesResponse = await generateImageService({
				prompt: topic,
				campaign_id: campaignId,
				prompt_id: promptId,
			});

			if (imagesResponse.success) {
				const images = imagesResponse.images || [];
				setGeneratedImages(images);
				setCurrentImageId(images[0]?.id || null);

				if (images.length > 0) {
					showNotification("Images générées avec succès !", "success");
					onSuccess?.();
					onContentGenerated?.("full");
				} else {
					showNotification("Aucune image n'a été générée.", "warning");
				}
			} else {
				showNotification(
					imagesResponse.message || "Erreur lors de la génération des images.",
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

	const handleRegenerate = async (imageId, updatedTopic) => {
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

			const regenResponse = await generateImageService({
				prompt: updatedTopic,
				campaign_id: campaignId,
				prompt_id: promptId,
			});

			if (regenResponse.success && regenResponse.images?.length > 0) {
				const updatedImages = regenResponse.images;
				setGeneratedImages((prev) =>
					prev.map((img) => (img.id === imageId ? updatedImages[0] : img))
				);
				showNotification("Image régénérée avec succès !", "success");
				onContentGenerated?.("full");
			} else {
				showNotification("Aucune image régénérée.", "warning");
			}
		} catch (error) {
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
			<RequestHeader headerText="Générer des Images" />

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
				placeholder={"Décrivez votre image..."}
				handleGenerate={handleGenerateImages}
				handleRegenerate={handleRegenerate}
				loading={loading}
				isCreating={isCreating}
				hasGeneratedPosts={generatedImages.length > 0}
				postId={currentImageId}
				selectedPlatform="any"
			/>

			{/* Images générées */}
			{generatedImages.length > 0 && (
				<div className="mt-6">
					<h3 className="text-lg font-semibold mb-4">Images générées</h3>
					<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
						{generatedImages.map((image) => (
							<div
								key={image.id}
								className="border rounded-lg overflow-hidden flex flex-col"
							>
								<img
									src={image.url}
									alt={`Image générée ${image.id}`}
									className="w-full h-48 object-cover"
								/>
								<div className="p-3 flex justify-end">
									<button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
										Télécharger
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ImageMarketing;
